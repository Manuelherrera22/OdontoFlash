/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://odontoflash.netlify.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/dashboard/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/private/'],
      },
    ],
    additionalSitemaps: [
      'https://odontoflash.netlify.app/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
