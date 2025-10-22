const { Product, scheduled_crawl, Linkfilm } = require('../../models');
const puppeteer = require('puppeteer');
const cron = require('node-cron');
const moment = require('moment-timezone');
const { Op } = require('sequelize');

const categoryMap = {
  'Hành Động': 'hanh-dong', 'Cổ Trang': 'co-trang', 'Chiến Tranh': 'chien-tranh',
  'Viễn Tưởng': 'vien-tuong', 'Kinh Dị': 'kinh-di', 'Tài Liệu': 'tai-lieu',
  'Bí Ẩn': 'bi-an', 'Phim 18+': 'phim-18', 'Tình Cảm': 'tinh-cam', 'Tâm Lý': 'tam-ly',
  'Thể Thao': 'the-thao', 'Phiêu Lưu': 'phieu-luu', 'Âm Nhạc': 'am-nhac', 'Gia Đình': 'gia-dinh',
  'Học Đường': 'hoc-duong', 'Hài Hước': 'hai-huoc', 'Hình Sự': 'hinh-su', 'Võ Thuật': 'vo-thuat',
  'Khoa Học': 'khoa-hoc', 'Thần Thoại': 'than-thoai', 'Chính Kịch': 'chinh-kich', 'Kinh Điển': 'kinh-dien',
  'Hoạt Hình': 'hoat-hinh', 'Phim Bộ': 'phim-bo', 'Phim Lẻ': 'phim-le', 'Phim Shows': 'phim-shows',
  'Phim Sắp Chiếu': 'phim-sap-chieu'
};

// =================== Helper ===================
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const normalizeEpisodes = (apiItem) => {
  const list = [];
  if (!apiItem) return list;
  if (Array.isArray(apiItem.episodes)) {
    for (const server of apiItem.episodes) {
      if (server && Array.isArray(server.server_data)) {
        list.push(...server.server_data);
      }
    }
  } else if (apiItem.episodes && Array.isArray(apiItem.episodes.server_data)) {
    list.push(...apiItem.episodes.server_data);
  }
  return list;
};

const parseEpisodeTotalFromMeta = (apiItem) => {
  if (!apiItem) return 0;
  if (typeof apiItem.episode_total === 'string') {
    const m = apiItem.episode_total.match(/\d+/);
    return m ? Number(m[0]) : 0;
  }
  if (typeof apiItem.episode_current === 'string') {
    const ms = apiItem.episode_current.match(/\d+/g);
    if (ms && ms.length > 0) return Number(ms[ms.length - 1]);
  }
  return 0;
};

const getEpisodeNumber = (epObj, idx, type) => {
  if (type === 'single') return 1;
  if (!epObj) return idx + 1;
  const candidates = [epObj.name, epObj.slug];
  for (const c of candidates) {
    if (!c) continue;
    const m = String(c).match(/\d+/);
    if (m) return Number(m[0]);
  }
  return idx + 1;
};

// =================== Crawl Phim from Category ===================
const crawlPhimFromCategory = async (category) => {
  const categorySlug = categoryMap[category];
  const category_id = Object.keys(categoryMap).indexOf(category) + 1;
  if (!categorySlug) throw new Error('Invalid category');

  const baseUrl = ['Hoạt Hình', 'Phim Bộ', 'Phim Lẻ', 'Phim Shows', 'Phim Sắp Chiếu'].includes(category)
    ? 'https://ophim17.cc/danh-sach'
    : 'https://ophim17.cc/the-loai';

  const urls = Array.from({ length: 5 }, (_, i) => `${baseUrl}/${categorySlug}?page=${i + 1}`);
  const browser = await puppeteer.launch({
         headless: true,
         args: [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--disable-web-security',
  '--disable-features=VizDisplayCompositor'
]
});
  const page = await browser.newPage();
  const data = [];

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    try {
      await page.waitForSelector("tbody tr td.align-middle .font-bold a", { timeout: 10000 });
    } catch {
      console.warn(`⚠️ Không tìm thấy phim ở trang: ${url}`);
      continue;
    }

    const movies = await page.evaluate(() =>
      Array.from(document.querySelectorAll("tbody tr td.align-middle .font-bold a"))
        .map(a => ({ href: a.getAttribute("href"), title: a.textContent.trim() }))
    );
    movies.forEach(m => {
      if (m.href) data.push({ ...m, href: 'https://ophim17.cc' + m.href });
    });
    await sleep(2000);
  }

  const results = [];

  for (const movie of data) {
    try {
      await page.goto(movie.href, { waitUntil: 'networkidle2', timeout: 0 });
      await sleep(3000);

      const detailLink = await page.evaluate(() => {
        const linkElement = document.querySelector("main.flex-grow .grid-cols-1 .space-y-2 .gap-2 a");
        return linkElement ? linkElement.href : null;
      });

      if (!detailLink) continue;
      await page.goto(detailLink, { waitUntil: 'networkidle2', timeout: 0 });
      await sleep(3000);

      const detail = await page.evaluate(() => {
        const title = document.querySelector("h1")?.textContent.trim() || "";
        const nameenglish = document.querySelector("h2")?.textContent.trim() || "";
        const imageUrl = document.querySelector(".relative img")?.src || "";
        const descripts = document.querySelector(".leading-relaxed p")?.textContent.trim() || "";
        return { title, nameenglish, imageUrl, descripts };
      });

      const slug = detailLink.split('/').pop();
      let apiData = null;
      try {
        const apiUrl = `https://ophim1.com/v1/api/phim/${slug}`;
        const response = await page.evaluate(async (url) => {
          try {
            const res = await fetch(url);
            return await res.json();
          } catch (error) {
            return null;
          }
        }, apiUrl);
        if (response && response.status === "success" && response.data) {
          apiData = response.data;
        }
      } catch {}

      const finalTitle = apiData?.item?.name || detail.title;
      const finalNameEnglish = apiData?.item?.origin_name || detail.nameenglish;
      const finalImage = apiData?.seoOnPage?.seoSchema?.image ||
                         apiData?.item?.poster_url ||
                         apiData?.item?.thumb_url ||
                         detail.imageUrl;
      const finalDescription = apiData?.item?.content || detail.descripts;
      const namphathanh = apiData?.item?.year || new Date().getFullYear();
      const chatluong = apiData?.item?.quality || "HD";
      const ngonngu = apiData?.item?.lang || "Việt Sub";
      const daodien = apiData?.item?.director?.length > 0 ? apiData.item.director.join(", ") : "Đạo diễn";
      const dienvien = apiData?.item?.actor?.length > 0 ? apiData.item.actor.join(", ") : "Diễn viên";
      const theloai = apiData?.item?.category?.length > 0 ? apiData.item.category.map(c => c.name).join(", ") : "Thể loại";
      const quocgia = apiData?.item?.country?.length > 0 ? apiData.item.country.map(c => c.name).join(", ") : "Quốc gia";
      const trangthai = apiData?.item?.status || "Đang cập nhật";
      const thoiluong = apiData?.item?.time || "Đang cập nhật";
      const type = apiData?.item?.type || "single";

      const rawEpisodes = normalizeEpisodes(apiData?.item);
      let episodeTotal = rawEpisodes.length > 0 ? rawEpisodes.length : parseEpisodeTotalFromMeta(apiData?.item) || 0;

      const productData = {
        title: finalTitle,
        nameenglish: finalNameEnglish,
        hinhanh: finalImage,
        descripts: finalDescription,
        namphathanh,
        chatluong,
        lang: ngonngu,
        trangthai,
        sotap: episodeTotal,
        thoiluong,
        daodien,
        dienvien,
        theloai,
        quocgia,
        views: 0,
        likes: 0,
        VIP1: 0,
        category_id
      };

      results.push(productData);
      const existingProduct = await Product.findOne({ where: { title: finalTitle } });
      if (!existingProduct) await Product.create(productData);

      // Episodes
      const builtEpisodes = rawEpisodes.map((e, idx) => {
        const epNum = getEpisodeNumber(e, idx, type);
        const linkfilm = e.link_embed || null;
        return { episode: epNum, linkfilm };
      });

      const uniqueMap = new Map();
      for (const ep of builtEpisodes) {
        if (!ep.linkfilm) continue;
        if (!uniqueMap.has(ep.episode)) uniqueMap.set(ep.episode, ep);
      }
      const uniqueEpisodes = Array.from(uniqueMap.values());
      console.log(uniqueEpisodes, "uniqueEpisodes");

      for (const ep of uniqueEpisodes) {
        try {
          const existed = await Linkfilm.findOne({ where: { title: finalTitle, episode: ep.episode } });
          if (!existed) await Linkfilm.create({ title: finalTitle, episode: ep.episode, linkfilm: ep.linkfilm });
        } catch (err) {
          console.error(`Lỗi lưu episode ${ep.episode} (${finalTitle}):`, err.message || err);
        }
      }

    } catch (e) {
      console.error("Lỗi crawl chi tiết:", movie.href, e.message);
    }
  }

  await browser.close();
  return results;
};

// =================== API Handler: Crawl Phim ===================
const Crawlphim = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ error: 'Category is required' });
    const results = await crawlPhimFromCategory(category);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: `Failed to crawl phim: ${error.message}` });
  }
};

// =================== Cron Job ===================
let cronJob = null;

const createCronJob = () => {
  if (cronJob) return;
  cronJob = cron.schedule('0 0 * * *', async () => {
    try {
      const now = new Date();
      const localNow = moment(now).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
      const [crawlDate, crawlTime] = localNow.split(' ');

      const jobs = await scheduled_crawl.findAll({
        where: { status: 1, crawl_date: crawlDate, crawl_time: { [Op.lte]: crawlTime } }
      });

      for (const job of jobs) {
        const categories = JSON.parse(job.category);
        for (const category of categories) {
          await crawlPhimFromCategory(category);
        }
        await job.update({ status: 0 });
      }
    } catch (error) {
      console.error(`[Cron] Lỗi khi chạy cron: ${error.message}`);
    }
  }, { scheduled: false });
};

const StartScheduledCrawl = (req, res) => {
  try {
    createCronJob();
    cronJob.start();
    res.json({ message: 'Cron job started' });
  } catch {
    res.status(500).json({ error: 'Failed to start cron' });
  }
};

const StopScheduledCrawl = (req, res) => {
  try {
    cronJob?.stop();
    res.json({ message: 'Cron job stopped' });
  } catch {
    res.status(500).json({ error: 'Failed to stop cron' });
  }
};

const Delete_Scheduled_crawls = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'ID is required' });
    const deleted = await scheduled_crawl.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Scheduled crawl not found' });
    res.status(200).json({ message: 'Deleted scheduled crawl', id });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Create_Scheduled_crawls = async (req, res) => {
  try {
    const { categories, date, time } = req.body;
    if (!categories || !date || !time) {
      return res.status(400).json({ error: 'Categories, date, and time are required' });
    }

    const scheduledCrawl = await scheduled_crawl.create({
      category: JSON.stringify(categories),
      crawl_date: date,
      crawl_time: time,
      status: 1
    });

    res.status(200).json({
      status: 200,
      message: 'Scheduled crawl created successfully',
      data: scheduledCrawl
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create scheduled crawl: ' + error.message });
  }
};

const Get_Scheduled_crawls = async (req, res) => {
  try {
    const scheduledCrawls = await scheduled_crawl.findAll();
    res.status(200).json(scheduledCrawls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get scheduled crawls: ' + error.message });
  }
};

module.exports = {
  Crawlphim,
  StartScheduledCrawl,
  StopScheduledCrawl,
  Delete_Scheduled_crawls,
  Create_Scheduled_crawls,
  Get_Scheduled_crawls
};