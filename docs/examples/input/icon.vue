<script setup lang="ts">
import { Search, SettingTwo } from '@icon-park/vue-next'
import { Input } from '@universe-ui/vue'
import { ref } from 'vue'

const keyword = ref('')
const setting = ref('')
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 360px">
    <Input v-model="keyword" placeholder="搜索">
      <template #prefix>
        <Search :size="16" fill="currentColor" />
      </template>
    </Input>
    <Input v-model="setting" placeholder="设置项">
      <template #suffix>
        <SettingTwo :size="16" fill="currentColor" />
      </template>
    </Input>
  </div>
</template>
