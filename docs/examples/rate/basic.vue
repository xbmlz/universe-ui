<script setup lang="ts">
import { Rate } from '@universe-ui/vue'
import { ref } from 'vue'

const withText = ref(3)
const plain = ref(4)
</script>

<template>
  <div class="ud-demo-col">
    <Rate
      v-model="withText"
      show-text
    />
    <Rate v-model="plain" />
  </div>
</template>
