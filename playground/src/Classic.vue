<script setup lang="ts">
import { Button, Dialog } from '@universe-ui/vue'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Button
    type="primary"
    @click="open = true"
  >
    非 Vapor
  </Button>
  <Dialog
    v-model:open="open"
    title="普通应用"
    description="由 createApp 挂载"
    ok-text="确定"
  />
</template>
