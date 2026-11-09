<script setup lang="ts">
import { Radio } from '@universe-ui/vue'
import { ref } from 'vue'

const first = ref<string | number | null>('first')
const center = ref<string | number | null>('center')
</script>

<template>
  <div class="ud-demo-col">
    <Radio v-model="first" value="first" align="first" style="max-width: 240px">
      与首行文本对齐：这是一段可以换行的较长说明文字，用来观察多行文本的对齐方式。
    </Radio>
    <Radio v-model="center" value="center" align="center" style="max-width: 240px">
      与文本居中对齐：这是一段可以换行的较长说明文字，用来观察多行文本的对齐方式。
    </Radio>
  </div>
</template>
