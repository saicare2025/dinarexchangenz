export default async function sitemap() {
  const base = process.env.APP_URL || 'https://www.dinarexchange.co.nz';
  // Static routes
  const routes = ['', '/about', '/buydinar', '/buy-zimbabwe-dollar', '/contact', '/faq'].map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: p === '' ? 1.0 : 0.7,
  }));
  return routes;
}


