<script setup lang="ts">
withDefaults(defineProps<{ name?: 'arrow' | 'download' | 'github' | 'linkedin' | 'copy' | 'plus' | 'check' | 'menu' | 'close' | 'mail' }>(), { name: 'arrow' })
const paths = {
  arrow: 'M5 19 19 5M5 5h14v14',
  download: 'M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5',
  github: 'M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.9c0-1.1-.1-1.8-.6-2.4 3.1-.4 6.3-1.5 6.3-6.8A5.3 5.3 0 0 0 19.3 5 5 5 0 0 0 19.2 1s-1.2-.4-4.1 1.5a14.2 14.2 0 0 0-7.4 0C4.8.6 3.6 1 3.6 1A5 5 0 0 0 3.5 5a5.3 5.3 0 0 0-1.4 3.9c0 5.3 3.2 6.4 6.3 6.8-.4.5-.7 1.2-.7 2.3v4',
  linkedin: 'M5 9v12M5 4v.01M10 21V9h5v2c1-3 6-3 6 2v8M2 4a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z',
  copy: 'M8 8h12v13H8zM16 8V3H3v13h5',
  plus: 'M12 5v14M5 12h14',
  check: 'm5 12 4 4L19 6',
  menu: 'M3 7h18M3 17h18',
  close: 'm6 6 12 12M6 18 18 6',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name]" /></svg>
</template>
