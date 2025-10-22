const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const initRoutes = require('./routes/index');
const app = express();
const server = http.createServer(app);

// models
const db = require('./models');
const Product = db.Product;
const Linkfilm = db.Linkfilm;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- sitemap route ----------
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://mephim.io.vn';

    if (!Product || !Linkfilm) {
      console.error('Models missing:', Object.keys(db));
      return res.status(500).send('Server error: models not loaded');
    }

    // Lấy dữ liệu chỉ những trường tồn tại (tránh requested updatedAt/createdAt vì timestamps:false)
    const products = await Product.findAll({
      attributes: ['title'],
      raw: true
    });

    const links = await Linkfilm.findAll({
      attributes: ['title', 'episode'],
      raw: true
    });

    console.log(`Sitemap: products=${products.length}, links=${links.length}`);

    // Gom links theo title
    const movieMap = {};
    links.forEach(link => {
      const t = link.title || '';
      if (!movieMap[t]) movieMap[t] = [];
      movieMap[t].push(link);
    });

    // format date: vì model không có updatedAt, dùng thời điểm hiện tại
    const formatDate = () => new Date().toISOString();

    // Tạo XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Trang chủ
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}</loc>\n`;
    xml += `    <lastmod>${formatDate()}</lastmod>\n`;
    xml += `  </url>\n`;

    for (const prod of products) {
      if (!prod || !prod.title) continue;

      // giữ nguyên tiêu đề như site của bạn, chỉ encode URI
      const encodedTitle = encodeURIComponent(prod.title);
      const movieUrl = `${baseUrl}/${encodedTitle}`;

      xml += `  <url>\n`;
      xml += `    <loc>${movieUrl}</loc>\n`;
      xml += `    <lastmod>${formatDate()}</lastmod>\n`;
      xml += `  </url>\n`;

      const episodes = movieMap[prod.title] || [];
      for (const ep of episodes) {
        const epNum = ep.episode || '';
        const epUrl = `${baseUrl}/xem-phim/${encodedTitle}/tap-${encodeURIComponent(epNum)}`;
        xml += `  <url>\n`;
        xml += `    <loc>${epUrl}</loc>\n`;
        xml += `    <lastmod>${formatDate()}</lastmod>\n`;
        xml += `  </url>\n`;
      }
    }

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    return res.send(xml);
  } catch (err) {
    console.error('❌ Sitemap error:', err && err.stack ? err.stack : err);
    return res.status(500).send('Server error');
  }
});
// ---------- end sitemap ----------

app.set('server', server);
initRoutes(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;