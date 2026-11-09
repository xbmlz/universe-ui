<script setup lang="ts">
import { InputArea } from '@universe-ui/vue'
import { ref } from 'vue'

const text = ref('说明这段改动的目的。')
</script>

<template>
  <InputArea
    v-model="text"
    autosize
    :maxlength="120"
    label="备注"
    style="max-width: 420px"
  />
</template>
