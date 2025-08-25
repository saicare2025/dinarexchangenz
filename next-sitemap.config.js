/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.APP_URL || 'https://www.dinarexchange.co.nz',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    '/user/*',
    '/dashboard/*',
    '/login',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/user/', '/dashboard/', '/api/'] },
    ],
    additionalSitemaps: [],
  },
};


