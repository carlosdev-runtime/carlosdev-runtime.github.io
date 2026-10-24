export default defineNuxtConfig({
  compatibilityDate: '2026-10-24',
  devtools: { enabled: false },
  css: [
    '@fontsource-variable/manrope',
    '@fontsource/ibm-plex-mono/400.css',
    '~/assets/css/main.css',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Carlos Santana Nunes — Senior Software Engineer',
      meta: [
        { name: 'theme-color', content: '#101210' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'description', content: 'Carlos Santana Nunes. Mais de 12 anos em tecnologia. C#/.NET, sistemas distribuídos e engenharia de software da arquitetura à produção.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:image', content: '/social-card.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Carlos Santana Nunes',
        jobTitle: 'Senior Software Engineer',
        sameAs: ['https://github.com/CARLOSCSN', 'https://www.linkedin.com/in/carlos-santana-b53576101/'],
        knowsAbout: ['C#', '.NET', 'Software Engineering', 'Distributed Systems'],
      }) }],
    },
  },
  nitro: { prerender: { routes: ['/'] } },
  typescript: { strict: true },
})
