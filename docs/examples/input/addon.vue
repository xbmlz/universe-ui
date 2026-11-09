<script setup lang="ts">
import { Input, InputAddon } from '@universe-ui/vue'
import { ref } from 'vue'

const domain = ref('universe')
const protocol = ref('https')
const protocols = [
  { value: 'https', label: 'https' },
  { value: 'http', label: 'http' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 420px">
    <Input v-model="domain" placeholder="域名">
      <template #addon-before>https://</template>
      <template #addon-after>.com</template>
    </Input>

    <Input v-model="domain" placeholder="选择协议">
      <template #addon-before>
        <InputAddon v-model="protocol" :options="protocols" />
      </template>
    </Input>
  </div>
</template>
