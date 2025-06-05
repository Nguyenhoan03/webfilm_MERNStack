require('dotenv').config();
const axios = require('axios');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Đọc biến môi trường, fallback nếu chưa có
const BASE_URL = process.env.FRONTEND_URL || 'https://nghienphim.click';
const BACKEND_URL = process.env.BACKEND_URL || 'https://webphim-mernstack-nodejs.onrender.com';

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  // Các route tĩnh
  const staticRoutes = [
    '/',
    '/phim-bo',
    '/phim-le',
    '/phim-shows',
    '/dang-nhap',
    '/dang-ky',
    // Thêm các route tĩnh khác nếu cần
  ];
  staticRoutes.forEach(url => sitemap.write({ url, changefreq: 'weekly', priority: 0.8 }));

  // Lấy danh sách phim từ API mới
  const { data } = await axios.get(`${BACKEND_URL}/sitemap/movies`);
  const movies = Array.isArray(data) ? data : data.movies;

  movies.forEach(movie => {
    // Trang chi tiết phim
    sitemap.write({ url: `/${movie.title}`, changefreq: 'weekly', priority: 0.7 });

    // Trang xem từng tập
    if (movie.episodes && Array.isArray(movie.episodes)) {
      movie.episodes.forEach(ep => {
        sitemap.write({ url: `/xem-phim/${movie.title}/${ep}`, changefreq: 'weekly', priority: 0.6 });
      });
    }
  });

  sitemap.end();
  await streamToPromise(sitemap);
  console.log('Sitemap created!');
}

generateSitemap().catch(console.error);