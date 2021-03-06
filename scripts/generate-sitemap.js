const fs = require("fs");

process.env.NODE_ENV == "production" ? generateSitmap() : null;
async function generateSitmap() {
	const formatYmd = (date) => date.toISOString().slice(0, 10);
	console.log('Generating sitemap.xml');
	// Example

	const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://bookmarks.squale.agency</loc>
                <lastmod>${formatYmd(new Date())}</lastmod>

                <changefreq>weekly</changefreq>

                <priority>1.0</priority>

            </url>
        </urlset>
    `;

	// If you're not using Prettier, you can remove this.

	fs.writeFileSync("public/sitemap.xml", sitemap);
}
