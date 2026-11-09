<script setup lang="ts">
import { DropdownItem, SplitButton } from '@universe-ui/vue'

function onSelect(command: string | undefined) {
  console.log('select', command)
}
</script>

<template>
  <div class="ud-demo-row">
    <SplitButton text="保存" type="primary" @select="onSelect">
      <template #menu>
        <DropdownItem command="save-as">另存为</DropdownItem>
        <DropdownItem command="export">导出</DropdownItem>
        <DropdownItem command="archive" divided>归档</DropdownItem>
      </template>
    </SplitButton>
  </div>
</template>
