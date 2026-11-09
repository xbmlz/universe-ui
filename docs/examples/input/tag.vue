<script setup lang="ts">
import { Input } from '@universe-ui/vue'
import { ref } from 'vue'

const chinese = ref('')
const english = ref('')
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 360px">
    <Input v-model="chinese" label="标题">
      <template #tag>
        中文
      </template>
    </Input>
    <Input v-model="english" label="标题">
      <template #tag>
        English
      </template>
    </Input>
  </div>
</template>
