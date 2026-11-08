<script setup lang="ts" vapor>
import SectionsAvatars from './sections/SectionsAvatars.vue'
import SectionsButtons from './sections/SectionsButtons.vue'
import SectionsDisplay from './sections/SectionsDisplay.vue'
import SectionsEntry from './sections/SectionsEntry.vue'
import SectionsFeedback from './sections/SectionsFeedback.vue'
import SectionsTokens from './sections/SectionsTokens.vue'
</script>

<template>
  <main class="page">
    <header class="page__header">
      <p class="eyebrow">
        universe-ui
      </p>
      <h1>组件预览</h1>
    </header>

    <SectionsButtons />
    <SectionsEntry />
    <SectionsDisplay />
    <SectionsFeedback />
    <SectionsAvatars />
    <SectionsTokens />
  </main>
</template>

<style>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  color: var(--ud-color-text);
  font-family: var(--ud-font-family);
}

.page__header h1 {
  margin: 4px 0 0;
  font-size: var(--ud-font-size-h1);
  font-weight: var(--ud-font-weight-semibold);
  line-height: var(--ud-line-h1);
}

.eyebrow {
  margin: 0;
  color: var(--ud-color-brand);
  font-size: var(--ud-font-size-body);
  font-weight: var(--ud-font-weight-medium);
  line-height: var(--ud-line-body);
}

.panel {
  margin-top: 16px;
  padding: 20px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-l);
  background: var(--ud-color-bg-white);
}

.panel > h2 {
  margin: 0 0 16px;
  font-size: var(--ud-font-size-h4);
  font-weight: var(--ud-font-weight-medium);
  line-height: var(--ud-line-h4);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.row--end {
  align-items: flex-end;
}

.row:last-child,
.ud-button-group {
  margin-bottom: 12px;
}

.panel .ud-button-group:last-child {
  margin-bottom: 0;
}

.theme-green {
  --ud-color-brand: #32a645;
  --ud-color-brand-hover: #35bd4b;
  --ud-color-brand-pressed: #32a645;
  --ud-color-brand-loading: #35bd4b;
}

.inputs {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
}

.inputs:last-child {
  margin-bottom: 0;
}

.checks {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 360px;
}

.check-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.switches {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.tabs-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 16px;
}

.badges {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.toast-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.notice-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 688px;
  margin-bottom: 16px;
}

.dialog-log {
  color: var(--ud-color-text-placeholder);
  font-size: 12px;
}

.dialog-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 138px;
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-bg-1);
  color: var(--ud-color-text-secondary);
}

.dialog-file {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}

.dialog-file__size {
  color: var(--ud-color-text-placeholder);
  font-size: 12px;
  line-height: 20px;
}

.drawer-push-demo {
  display: flex;
  height: 240px;
  margin-bottom: 16px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-s);
  overflow: hidden;
}

.drawer-push-demo__content {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  min-width: 0;
  color: var(--ud-color-text-placeholder);
}

.drawer-area {
  height: 685px;
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-bg-2);
}

.drawer-icon-button {
  display: inline-flex;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
}

.notification-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.notification-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 108px;
  background: var(--ud-color-bg-2);
  color: var(--ud-color-text-placeholder);
  text-align: center;
}

.progress-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 440px;
  margin-bottom: 24px;
}

.spin-dark,
.spin-grey {
  display: inline-flex;
  padding: 16px;
  background: var(--ud-color-brand);
}

.spin-grey {
  background: var(--ud-color-bg-1);
}

.spin-module {
  width: 240px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-m);
}

.spin-module__body {
  padding: 16px;
}

.spin-module__body p {
  margin: 0 0 8px;
}

.skeleton-demo {
  padding: 16px;
  background: var(--ud-color-bg-3);
}

.badge-icon {
  display: inline-flex;
  font-size: 24px;
  color: var(--ud-color-icon);
}

.badge-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--ud-color-brand);
  color: var(--ud-color-text-inverse);
  font-size: 16px;
}

.ud-tag.tag-narrow {
  max-width: 120px;
}

.ud-radio.radio-narrow {
  max-width: 160px;
}

.inputs--select .ud-select {
  max-width: 240px;
}

.inputs--select :is(.ud-cascader, .ud-tree-select) {
  max-width: 240px;
}

.spec-sizes {
  display: grid;
  grid-template-columns: 80px repeat(2, 240px);
  align-items: center;
  gap: 20px;
}

.spec-sizes > .ud-input,
.spec-sizes > .ud-select {
  min-width: 0;
}

.spec-sizes__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
}

.panel > .ud-breadcrumb,
.crumb-narrow {
  margin-bottom: 12px;
}

.crumb-narrow {
  width: 280px;
}

.steps-demo {
  display: grid;
  gap: 28px;
}

.steps-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 720px;
}

.steppers {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  align-items: end;
  gap: 20px;
  margin-bottom: 16px;
}

.rates {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.sliders {
  display: grid;
  gap: 24px;
  max-width: 480px;
  margin-bottom: 16px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.card-demo p {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
}

.timelines {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

.transfers {
  display: grid;
  gap: 24px;
  max-width: 544px;
}

.color-pickers {
  display: grid;
  grid-template-columns: repeat(4, 220px);
  align-items: end;
  gap: 20px;
}

.uploads {
  display: grid;
  gap: 24px;
  max-width: 552px;
}

.scrollbars {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.scrollbar-demo {
  height: 160px;
  padding: 8px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-m);
}

.scrollbar-demo--horizontal {
  height: 120px;
}

.scrollbar-content p,
.scrollbar-wide p {
  margin: 0;
  color: var(--ud-color-text-secondary);
}

.scrollbar-wide {
  width: 1200px;
}

.anchor-demo {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.anchor-demo__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.anchor-block {
  padding: 16px;
  border-radius: var(--ud-radius-m);
  background: var(--ud-color-bg-2);
}

.anchor-block--sub {
  margin-top: 12px;
  margin-left: 16px;
  background: var(--ud-color-bg-3);
}

.nav-brand {
  color: var(--ud-color-brand);
  font-size: var(--ud-font-size-h3);
  font-weight: var(--ud-font-weight-semibold);
}

.collapse-demo {
  display: grid;
  gap: 24px;
  max-width: 560px;
}

.hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}

.text-action {
  border: 0;
  background: transparent;
  color: var(--ud-color-brand);
  font: inherit;
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
  cursor: pointer;
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
  gap: 12px;
}

.swatch__chip {
  display: block;
  height: 48px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-s);
}

.swatch__chip[data-brand='true'] {
  outline: 2px solid var(--ud-color-brand);
  outline-offset: 2px;
}

.swatch__name,
.swatch__hex {
  display: block;
  margin-top: 6px;
  font-size: 12px;
}

.swatch__hex {
  color: var(--ud-color-text-secondary);
}

.type-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 0;
  color: var(--ud-color-text);
}

.type-row__meta {
  color: var(--ud-color-text-secondary);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.radius,
.shadow {
  display: grid;
  place-items: center;
  width: 96px;
  height: 64px;
  background: var(--ud-color-bg-white);
  color: var(--ud-color-text-secondary);
  font-size: 12px;
}

.radius {
  border: 1px solid var(--ud-color-border);
}

.shadow {
  border-radius: var(--ud-radius-m);
}
</style>
