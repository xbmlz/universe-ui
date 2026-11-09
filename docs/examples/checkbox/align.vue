<script setup lang="ts">
import { Checkbox } from '@universe-ui/vue'
import { ref } from 'vue'

const first = ref(true)
const center = ref(false)
</script>

<template>
  <div class="ud-demo-col">
    <Checkbox v-model="first" align="first" style="max-width: 240px">
      与首行文本对齐：这是一段可以换行的较长说明文字，用来观察多行文本的对齐方式。
    </Checkbox>
    <Checkbox v-model="center" align="center" style="max-width: 240px">
      与文本居中对齐：这是一段可以换行的较长说明文字，用来观察多行文本的对齐方式。
    </Checkbox>
  </div>
</template>
