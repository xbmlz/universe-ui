<script setup lang="ts">
import { Input } from '@universe-ui/vue'
import { ref } from 'vue'

const password = ref('')
const disabled = ref('')
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Input
      v-model="password"
      type="password"
      clearable
      label="密码"
      placeholder="请输入密码"
    />
    <Input
      v-model="disabled"
      type="password"
      disabled
      label="密码"
      placeholder="禁用"
    />
  </div>
</template>
