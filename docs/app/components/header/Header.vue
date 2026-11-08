<script setup lang="ts">
const { desktopLinks } = useHeader()
</script>

<template>
  <UHeader>
    <template #left>
      <HeaderLogo />
    </template>

    <UNavigationMenu :items="desktopLinks" variant="link" content-orientation="vertical" />

    <template #right>
      <UColorModeButton />

      <UButton
        color="neutral"
        variant="ghost"
        icon="i-simple-icons-github"
        label="GitHub"
        to="https://github.com/cxc/universe-ui"
        target="_blank"
      />
    </template>

    <template #body>
      <HeaderBody />
    </template>
  </UHeader>
</template>
