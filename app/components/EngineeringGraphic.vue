<script setup lang="ts">
defineProps<{ labels: readonly string[]; title: string; caption: string; eyebrow: string }>()
</script>

<template>
  <div class="engineering-graphic" aria-hidden="true">
    <div class="graphic-top mono"><span>{{ eyebrow }}</span><span class="graphic-index">CS / 001</span></div>
    <svg class="system-art" viewBox="0 0 520 390" fill="none">
      <defs>
        <pattern id="dot-grid" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#75806a" opacity=".3" /></pattern>
        <radialGradient id="core-glow"><stop stop-color="#c9e98b" stop-opacity=".14" /><stop offset="1" stop-color="#c9e98b" stop-opacity="0" /></radialGradient>
      </defs>
      <rect x="0" y="0" width="520" height="390" fill="url(#dot-grid)" />
      <circle cx="260" cy="194" r="165" fill="url(#core-glow)" />
      <g stroke="#667457" stroke-opacity=".38"><ellipse cx="260" cy="194" rx="170" ry="122" transform="rotate(-28 260 194)" /><ellipse cx="260" cy="194" rx="170" ry="122" transform="rotate(28 260 194)" /><circle cx="260" cy="194" r="91" stroke-dasharray="3 7" /></g>
      <g stroke="#c9e98b" stroke-opacity=".6"><path d="M260 194 108 106M260 194l151-88M260 194l151 90M260 194l-152 90M260 194V44M260 194v150" /></g>
      <g class="orbit-ticks" stroke="#c9e98b"><path d="M260 15v12m-6-6h12M260 361v12m-6-6h12M69 194H57m6-6v12M463 194h-12m6-6v12" /></g>
      <rect x="205" y="139" width="110" height="110" rx="22" fill="#1b2117" stroke="#c9e98b" stroke-opacity=".8" />
      <rect x="212" y="146" width="96" height="96" rx="17" stroke="#c9e98b" stroke-opacity=".15" />
      <text x="260" y="206" text-anchor="middle" fill="#e9efdc" font-family="Manrope Variable,sans-serif" font-size="37" font-weight="650" letter-spacing="-3">cs<tspan fill="#c9e98b">.</tspan></text>
      <g class="diagram-node"><rect x="57" y="85" width="102" height="42" rx="6" /><text x="108" y="111">{{ labels[0] }}</text></g>
      <g class="diagram-node"><rect x="361" y="85" width="102" height="42" rx="6" /><text x="412" y="111">{{ labels[1] }}</text></g>
      <g class="diagram-node"><rect x="205" y="25" width="110" height="38" rx="6" /><text x="260" y="49">{{ labels[2] }}</text></g>
      <g class="diagram-node"><rect x="52" y="264" width="112" height="42" rx="6" /><text x="108" y="290">{{ labels[3] }}</text></g>
      <g class="diagram-node"><rect x="361" y="264" width="102" height="42" rx="6" /><text x="412" y="290">{{ labels[4] }}</text></g>
      <g class="diagram-node"><rect x="205" y="326" width="110" height="38" rx="6" /><text x="260" y="350">{{ labels[5] }}</text></g>
      <circle class="signal signal-one" cx="176" cy="145" r="3" fill="#d5f4a2" /><circle class="signal signal-two" cx="340" cy="241" r="3" fill="#d5f4a2" />
    </svg>
    <div class="graphic-bottom"><span>{{ title }}</span><p>{{ caption }}</p></div>
  </div>
</template>
