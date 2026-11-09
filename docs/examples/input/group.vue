<script setup lang="ts">
import { Input, InputGroup, InputNumber, Select } from '@universe-ui/vue'
import { ref } from 'vue'

const name = ref('陈晓')
const age = ref(28)
const role = ref<string | null>('design')
const roles = [
  { value: 'design', label: '设计师' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品经理' },
]
</script>

<template>
  <InputGroup label="成员信息" style="max-width: 520px">
    <Input v-model="name" placeholder="姓名" />
    <InputNumber v-model="age" :min="0" :max="120" />
    <Select v-model="role" :options="roles" placeholder="角色" />
  </InputGroup>
</template>
