<script setup lang="ts">
import { Checkbox } from '@universe-ui/vue'
import { ref } from 'vue'

const accepted = ref(true)
const subscribed = ref(false)
</script>

<template>
  <div class="ud-demo-col">
    <Checkbox v-model="accepted">同意服务条款</Checkbox>
    <Checkbox v-model="subscribed">订阅更新通知</Checkbox>
  </div>
</template>
