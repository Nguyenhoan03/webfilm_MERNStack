const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Sử dụng mysql2/promise để dùng db.execute

// Kết nối DB (ví dụ, bạn cần thay đổi config cho phù hợp)
const dbConfig = require('../config/config.json');
const pool = mysql.createPool(dbConfig);

router.get('/sitemap-frontend.xml', async (req, res) => {
    res.header('Content-Type', 'application/xml');

    const staticUrls = [
        '/', '/dang-ky', '/dang-nhap', '/phim-bo', '/phim-le', '/phim-shows', '/phim-sap-chieu',
        '/the-loai/hanh-dong', '/the-loai/vien-tuong', '/the-loai/bi-an', '/the-loai/kinh-di', '/the-loai/18+',
        '/the-loai/co-trang', '/the-loai/vo-thuat', '/the-loai/phieu-luu', '/the-loai/than-thoai',
        '/the-loai/chien-tranh', '/the-loai/hinh-su', '/the-loai/tinh-cam', '/the-loai/tam-ly',
        '/the-loai/gia-dinh', '/the-loai/hoat-hinh', '/the-loai/am-nhac', '/the-loai/the-thao',
        '/the-loai/hai-huoc', '/the-loai/hoc-duong', '/the-loai/chinh-kich', '/the-loai/tai-lieu',
        '/the-loai/kinh-dien', '/the-loai/khoa-hoc'
    ];

    try {
        const [films] = await pool.execute('SELECT slug FROM products');
        const [episodes] = await pool.execute('SELECT slug, episode FROM linkfilms');

        const dynamicUrls = [];

        // Route động: /:slug
        films.forEach(film => {
            if (film.slug) dynamicUrls.push(`/${film.slug}`);
        });

        // Route động: /xem-phim/:slug/tap-:episode
        episodes.forEach(ep => {
            if (ep.slug && ep.episode) dynamicUrls.push(`/xem-phim/${ep.slug}/tap-${ep.episode}`);
        });

        const allUrls = [...staticUrls, ...dynamicUrls];

        const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `
  <url>
    <loc>${req.protocol}://${req.get('host')}${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url.startsWith('/xem-phim/') ? '1.0' : (url.startsWith('/') && url.split('/').length === 2 ? '0.9' : '0.7')}</priority>
  </url>`).join('')}
</urlset>`;

        res.send(sitemapXml.trim());
    } catch (err) {
        console.error('Lỗi tạo sitemap:', err);
        res.status(500).send('<?xml version="1.0"?><error>Internal Server Error</error>');
    }
});

module.exports = router;