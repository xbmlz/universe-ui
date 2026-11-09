<script setup lang="ts">
import { codeToHtml } from 'shiki'

const props = defineProps<{
  code: string
}>()

const html = props.code
  ? await codeToHtml(props.code, {
      lang: 'vue',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    })
  : ''
</script>

<template>
  <div v-if="html" v-html="html" />
</template>
