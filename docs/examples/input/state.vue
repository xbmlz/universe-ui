<script setup lang="ts">
import { Input } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref('已填写的内容')
const empty = ref('')
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 360px">
    <Input v-model="value" label="名称" />
    <Input v-model="value" clearable placeholder="可清除" />
    <Input v-model="empty" disabled placeholder="禁用" />
    <Input v-model="value" readonly placeholder="只读" />
    <Input v-model="empty" error message="名称不能为空" placeholder="错误状态" />
  </div>
</template>
