<script setup lang="ts">
import { Switch } from '@universe-ui/vue'
import { ref } from 'vue'

const on = ref(true)
const off = ref(false)
</script>

<template>
  <div class="ud-demo-row">
    <Switch v-model="on" />
    <Switch v-model="off" size="sm" />
  </div>
</template>
