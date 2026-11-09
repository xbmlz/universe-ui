<script setup lang="ts">
import { Switch } from '@universe-ui/vue'
import { ref } from 'vue'

const on = ref(true)
</script>

<template>
  <div class="ud-demo-row">
    <Switch loading />
    <Switch v-model="on" loading />
  </div>
</template>
