export default function robots() {
  const base = process.env.APP_URL || 'https://www.dinarexchange.co.nz';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/user/', '/dashboard/', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}


