<script setup lang="ts">
import { Input } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <Input v-model="value" placeholder="请输入内容" style="width: 320px" />
</template>
