<script setup lang="ts">
import { Input } from '@universe-ui/vue'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 360px">
    <Input v-model="name" borderless placeholder="请输入姓名" />
    <Input v-model="email" borderless placeholder="请输入邮箱" />
  </div>
</template>
