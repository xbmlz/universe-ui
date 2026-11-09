<script setup lang="ts">
import { Checkbox } from '@universe-ui/vue'
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <div class="ud-demo-col">
    <Checkbox disabled>禁用，未选中</Checkbox>
    <Checkbox v-model="checked" disabled>禁用，已选中</Checkbox>
    <Checkbox error>错误，未选中</Checkbox>
  </div>
</template>
