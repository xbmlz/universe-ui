<script setup lang="ts">
const { mobileLinks } = useHeader()
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="mobileLinks" class="-mx-2.5" />
</template>
