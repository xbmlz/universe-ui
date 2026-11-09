<script setup lang="ts">
import { Checkbox, CheckboxGroup } from '@universe-ui/vue'
import { computed, ref } from 'vue'

const children = ref<(string | number)[]>(['design'])
const all = computed({
  get: () => children.value.length === 3,
  set: (value: boolean) => {
    children.value = value ? ['design', 'develop', 'pm'] : []
  },
})
const partial = computed(() => children.value.length > 0 && children.value.length < 3)
</script>

<template>
  <div class="ud-demo-stack">
    <Checkbox v-model="all" :indeterminate="partial">
      全选
    </Checkbox>
    <CheckboxGroup v-model="children">
      <Checkbox value="design">设计</Checkbox>
      <Checkbox value="develop">研发</Checkbox>
      <Checkbox value="pm">产品</Checkbox>
    </CheckboxGroup>
  </div>
</template>
