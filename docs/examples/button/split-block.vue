<script setup lang="ts">
import { DropdownItem, SplitButton } from '@universe-ui/vue'
</script>

<template>
  <SplitButton text="保存" type="primary" block>
    <template #menu>
      <DropdownItem command="save-as">另存为</DropdownItem>
      <DropdownItem command="export">导出</DropdownItem>
    </template>
  </SplitButton>
</template>
