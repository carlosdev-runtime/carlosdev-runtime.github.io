<script setup lang="ts">
import { content, contact, type Language } from './data/portfolio'

const language = ref<Language>('pt')
const t = computed(() => content[language.value])
const mobileMenuOpen = ref(false)
const selectedCase = ref(0)
const activeSection = ref('trabalho')
const toast = ref('')
const navigation = ['trabalho', 'sobre', 'experiencia', 'contato']
let observer: IntersectionObserver | undefined
let toastTimeout: ReturnType<typeof setTimeout> | undefined

useHead({ htmlAttrs: { lang: computed(() => language.value === 'pt' ? 'pt-BR' : 'en') } })
useSeoMeta({
  description: () => t.value.seoDescription,
  ogTitle: 'Carlos Santana Nunes — Senior Software Engineer',
  ogDescription: () => t.value.seoDescription,
  ogLocale: () => language.value === 'pt' ? 'pt_BR' : 'en_US',
})

function changeLanguage(value: Language) {
  language.value = value
  try { localStorage.setItem('portfolio-language', value) } catch { /* Storage is optional. */ }
}

function closeMenu() { mobileMenuOpen.value = false }

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contact.email)
    toast.value = t.value.copied
  } catch { toast.value = t.value.copyFailed }
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { toast.value = '' }, 4500)
}

function handleKey(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('portfolio-language')
    if (saved === 'pt' || saved === 'en') language.value = saved
  } catch { /* Storage is optional. */ }
  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
    if (visible[0]) activeSection.value = visible[0].target.id
  }, { rootMargin: '-18% 0px -45% 0px', threshold: [0, .1, .3] })
  navigation.forEach(id => {
    const section = document.getElementById(id)
    if (section) observer?.observe(section)
  })
  window.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(toastTimeout)
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <div id="top" class="portfolio">
    <a class="skip-link" href="#conteudo">{{ t.skip }}</a>
    <header class="site-header">
      <div class="shell header-inner">
        <a class="wordmark" href="#top" aria-label="Carlos Santana Nunes — início" @click="closeMenu">cs<span>.</span></a>
        <nav class="desktop-nav" aria-label="Principal">
          <a v-for="(id, index) in navigation" :key="id" :href="`#${id}`" :class="{ active: activeSection === id }">{{ t.nav[index] }}</a>
        </nav>
        <div class="header-actions">
          <div class="language-switch" aria-label="Idioma / Language">
            <button type="button" :aria-pressed="language === 'pt'" lang="pt-BR" @click="changeLanguage('pt')">PT</button>
            <span aria-hidden="true">/</span>
            <button type="button" :aria-pressed="language === 'en'" lang="en" @click="changeLanguage('en')">EN</button>
          </div>
          <a class="header-social" :href="contact.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (nova aba)"><AppIcon name="linkedin" /></a>
          <button class="menu-toggle" type="button" :aria-label="mobileMenuOpen ? t.closeMenu : t.menu" :aria-expanded="mobileMenuOpen" aria-controls="mobile-navigation" @click="mobileMenuOpen = !mobileMenuOpen"><AppIcon :name="mobileMenuOpen ? 'close' : 'menu'" /></button>
        </div>
      </div>
      <nav v-if="mobileMenuOpen" id="mobile-navigation" class="mobile-nav shell" aria-label="Mobile">
        <a v-for="(id, index) in navigation" :key="id" :href="`#${id}`" @click="closeMenu"><span class="mono">0{{ index + 1 }}</span>{{ t.nav[index] }}<AppIcon /></a>
      </nav>
    </header>

    <main id="conteudo">
      <section class="hero shell" aria-labelledby="hero-title">
        <div class="hero-topline mono"><span><i class="status-dot" />{{ t.location }} <span class="muted">/ UTC−3</span></span><span class="hero-coordinate">25°25′ S · 49°16′ W</span></div>
        <div class="hero-layout">
          <div class="hero-copy">
            <p class="hero-name">Carlos Santana Nunes <span class="small-cross" aria-hidden="true">✳</span></p>
            <p class="eyebrow hero-role">{{ t.role }}</p>
            <h1 id="hero-title"><span>{{ t.hero[0] }}</span><span class="hero-accent">{{ t.hero[1] }}</span></h1>
            <p class="hero-description">{{ t.intro }}</p>
            <p class="hero-note">{{ t.introNote }}</p>
            <div class="hero-ctas"><a class="button button-primary" href="#trabalho">{{ t.workCta }}<AppIcon /></a><a class="text-link resume-link" href="/carlos-santana-nunes-curriculo.pdf" download>{{ t.resume }}<AppIcon name="download" /></a></div>
          </div>
          <EngineeringGraphic :labels="t.diagramLabels" :eyebrow="t.diagramLabel" :title="t.diagramTitle" :caption="t.diagramCaption" />
        </div>
        <div class="hero-bottom"><span class="mono">C# / .NET <span class="muted">&</span> {{ language === 'pt' ? 'SISTEMAS DISTRIBUÍDOS' : 'DISTRIBUTED SYSTEMS' }}</span><a href="#trabalho" class="scroll-link mono">{{ t.scroll }}<span aria-hidden="true">↓</span></a></div>
      </section>

      <div class="expertise-strip" aria-hidden="true"><div class="shell strip-inner"><template v-for="(item, index) in t.strip" :key="item"><span class="mono">{{ item }}</span><span v-if="index < t.strip.length - 1" class="strip-star">✳</span></template></div></div>

      <section id="trabalho" class="work-section section-padding" aria-labelledby="work-title">
        <div class="shell">
          <p class="eyebrow section-eyebrow">{{ t.caseEyebrow }}</p>
          <h2 id="work-title" class="section-title">{{ t.caseHeading }}<br><span>{{ t.caseHeadingAccent }}</span></h2>
          <article class="featured-case">
            <div class="case-intro"><div><p class="mono case-category">{{ t.caseCategory }}</p><h3>{{ t.caseTitle }}<span class="case-title-dot" aria-hidden="true">●</span></h3><p class="case-description">{{ t.caseIntro }}</p></div><div class="case-role"><span class="mono">{{ t.caseRoleLabel }}</span><p>{{ t.caseRole }}</p><span class="case-year mono">INDEPENDENT ENGINEERING</span></div></div>
            <div class="case-layout">
              <div class="case-story">
                <div class="case-switcher" :aria-label="language === 'pt' ? 'Explore o case' : 'Explore the case'"><button v-for="(tab, index) in t.caseTabs" :key="index" type="button" :class="{ selected: selectedCase === index }" :aria-pressed="selectedCase === index" aria-controls="case-panel" @click="selectedCase = index"><span class="mono">0{{ index + 1 }}</span>{{ tab }}</button></div>
                <div id="case-panel" class="case-panel" aria-live="polite"><h4>{{ t.casePanels[selectedCase]!.title }}</h4><p>{{ t.casePanels[selectedCase]!.text }}</p><ul><li v-for="point in t.casePanels[selectedCase]!.points" :key="point"><AppIcon name="check" />{{ point }}</li></ul></div>
                <div class="case-tags"><span>.NET</span><span>Nuxt / Vue</span><span>SQL Server</span><span>Docker</span></div>
              </div>
              <div class="blueprint" :aria-label="t.blueprintNote">
                <div class="blueprint-top mono"><span class="status-dot" />{{ t.blueprintLabel }}<span class="blueprint-corner">+</span></div>
                <div class="blueprint-body"><div class="blueprint-level"><span class="blueprint-step mono">01</span><div class="blueprint-box"><span>{{ t.blueprintUi }}</span><strong>Nuxt <span class="muted">/</span> Vue <span class="muted">/</span> TypeScript</strong><span class="blueprint-port" /></div></div><div class="blueprint-connector"><span>HTTPS / REST</span></div><div class="blueprint-level"><span class="blueprint-step mono">02</span><div class="blueprint-box highlighted"><span>{{ t.blueprintApi }}</span><strong>ASP.NET Core <span class="muted">/</span> C#</strong><small>Clean Architecture · JWT / Identity</small><span class="blueprint-port" /></div></div><div class="blueprint-branches"><i /><i /><i /></div><div class="data-nodes"><div><span class="node-symbol">▤</span><strong>SQL Server</strong></div><div><span class="node-symbol">⌁</span><strong>Redis</strong></div><div><span class="node-symbol">⋈</span><strong>RabbitMQ</strong></div></div></div>
                <div class="blueprint-footer mono"><span>Docker Compose</span><span>{{ t.blueprintFooter }}<i class="status-dot" /></span></div>
                <p class="blueprint-caption mono">{{ t.blueprintNote }}</p>
              </div>
            </div>
          </article>
          <p class="engineering-note"><span aria-hidden="true">↳</span>{{ t.engineeringNote }}</p>
        </div>
      </section>

      <section id="sobre" class="about-section section-padding" aria-labelledby="about-title">
        <div class="shell">
          <p class="eyebrow section-eyebrow">{{ t.aboutEyebrow }}</p>
          <div class="about-layout"><h2 id="about-title" class="section-title">{{ t.aboutHeading }}<br><span>{{ t.aboutHeadingAccent }}</span></h2><div class="about-text"><p>{{ t.aboutText }}</p><p>{{ t.aboutText2 }}</p></div></div>
          <div class="facts"><div v-for="fact in t.facts" :key="fact.label" class="fact"><strong>{{ fact.number }}</strong><span class="mono">{{ fact.label }}</span></div><div class="fact-signature" aria-hidden="true">cs<span>.</span><span class="signature-caption mono">SOFTWARE<br>ENGINEER</span></div></div>
          <div class="skills-header"><h3>{{ t.skillsTitle }}</h3><span class="mono muted">STACK / {{ new Date().getFullYear() }}</span></div>
          <div class="skills-grid"><div v-for="skill in t.skills" :key="skill.number" class="skill"><span class="mono skill-number">{{ skill.number }} /</span><h4>{{ skill.title }}</h4><p>{{ skill.items }}</p></div></div>
          <div class="ai-note"><span class="mono ai-label"><span aria-hidden="true">✳</span>{{ t.aiLabel }}</span><p>{{ t.aiText }}</p></div>
        </div>
      </section>

      <section id="experiencia" class="experience-section section-padding" aria-labelledby="experience-title">
        <div class="shell"><p class="eyebrow section-eyebrow">{{ t.experienceEyebrow }}</p><div class="experience-heading"><h2 id="experience-title" class="section-title">{{ t.experienceHeading }}<br><span>{{ t.experienceHeadingAccent }}</span></h2><p>{{ t.experienceIntro }}</p></div>
          <div class="timeline"><article v-for="(job, index) in t.experience" :key="job.company" class="timeline-row"><div class="timeline-meta"><span class="mono timeline-period">{{ job.period }}</span><span class="timeline-index mono">0{{ index + 1 }}</span></div><div class="timeline-company"><h3>{{ job.company }}</h3><p v-if="'suffix' in job" class="company-suffix">{{ job.suffix }}</p><p class="job-role">{{ job.role }}</p></div><div class="timeline-detail"><p>{{ job.description }}</p><span class="mono">{{ job.tags }}</span></div></article></div>
          <div class="earlier-experience"><span class="mono">{{ t.earlierLabel }}</span><p>{{ t.earlierText }}</p><a class="text-link" href="/carlos-santana-nunes-curriculo.pdf" download>{{ t.resume }}<AppIcon name="download" /></a></div>
        </div>
      </section>

      <section id="contato" class="contact-section section-padding" aria-labelledby="contact-title"><div class="shell"><p class="eyebrow section-eyebrow">{{ t.contactEyebrow }}</p><div class="contact-heading"><h2 id="contact-title">{{ t.contactHeading }}<br><span>{{ t.contactHeadingAccent }}</span></h2><span class="contact-flower" aria-hidden="true">✳</span></div><p class="contact-description">{{ t.contactText }}</p><div class="contact-bottom"><div class="email-group"><a class="button button-primary" :href="`mailto:${contact.email}`">{{ t.emailCta }}<AppIcon /></a><button class="copy-button" type="button" :aria-label="t.copy" @click="copyEmail"><AppIcon name="copy" /></button></div><div class="social-links"><a :href="contact.linkedin" target="_blank" rel="noopener noreferrer"><AppIcon name="linkedin" />LinkedIn<AppIcon /></a><a :href="contact.github" target="_blank" rel="noopener noreferrer"><AppIcon name="github" />GitHub<AppIcon /></a></div></div><a class="email-address" :href="`mailto:${contact.email}`">{{ contact.email }}</a></div></section>
    </main>

    <footer class="site-footer"><div class="shell footer-inner"><a class="wordmark" href="#top" aria-label="Carlos Santana Nunes — início">cs<span>.</span></a><p>© {{ new Date().getFullYear() }} Carlos Santana Nunes<span>{{ t.footerNote }}</span></p><a class="back-top mono" href="#top">{{ t.backTop }}<span aria-hidden="true">↑</span></a></div></footer>
    <div class="toast" role="status" aria-live="polite" :class="{ visible: toast }">{{ toast }}</div>
  </div>
</template>
