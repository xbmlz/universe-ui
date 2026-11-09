<script setup lang="ts">
import { Checkbox } from '@universe-ui/vue'
import { ref } from 'vue'

const unchecked = ref(false)
const checked = ref(true)
const partial = ref(false)
</script>

<template>
  <div class="ud-demo-col">
    <Checkbox v-model="unchecked">未选中</Checkbox>
    <Checkbox v-model="checked">已选中</Checkbox>
    <Checkbox v-model="partial" indeterminate>部分选中</Checkbox>
  </div>
</template>
