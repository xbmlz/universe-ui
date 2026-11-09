<script setup lang="ts">
import { InputChars } from '@universe-ui/vue'
import { ref } from 'vue'

const code = ref('')
</script>

<template>
  <InputChars
    v-model="code"
    :length="6"
    label="验证码"
    style="max-width: 360px"
  />
</template>
