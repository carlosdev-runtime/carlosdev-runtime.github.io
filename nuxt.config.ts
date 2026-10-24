const siteUrl = 'https://carlosdev-runtime.github.io'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-24',
  devtools: { enabled: false },
  css: [
    '@fontsource-variable/manrope',
    '@fontsource/ibm-plex-mono/400.css',
    '~/assets/css/main.css',
  ],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Carlos Santana Nunes — Senior Software Engineer',
      meta: [
        { name: 'theme-color', content: '#101210' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'description', content: 'Carlos Santana Nunes. Mais de 12 anos em tecnologia. C#/.NET, sistemas distribuídos e engenharia de software da arquitetura à produção.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:image', content: `${siteUrl}/social-card.png` },
        { property: 'og:image:alt', content: 'Carlos Santana Nunes — Senior Software Engineer' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${siteUrl}/social-card.png` },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: `${siteUrl}/` },
      ],
      script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Carlos Santana Nunes',
        url: `${siteUrl}/`,
        jobTitle: 'Senior Software Engineer',
        sameAs: ['https://github.com/CARLOSCSN', 'https://www.linkedin.com/in/carlos-santana-b53576101/'],
        knowsAbout: ['C#', '.NET', 'Software Engineering', 'Distributed Systems'],
      }) }],
    },
  },
  nitro: {
    preset: 'github-pages',
    prerender: { routes: ['/'], crawlLinks: true, failOnError: true },
  },
  typescript: { strict: true },
})
