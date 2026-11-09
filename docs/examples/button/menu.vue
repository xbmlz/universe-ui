<script setup lang="ts">
import { DropdownItem, MenuButton } from '@universe-ui/vue'

function onSelect(command: string | undefined) {
  console.log('select', command)
}
</script>

<template>
  <div class="ud-demo-row">
    <MenuButton type="secondary" text="更多" @select="onSelect">
      <template #menu>
        <DropdownItem command="edit">编辑</DropdownItem>
        <DropdownItem command="copy">复制</DropdownItem>
        <DropdownItem command="archive" divided>归档</DropdownItem>
      </template>
    </MenuButton>
    <MenuButton text="新建" @select="onSelect">
      <template #menu>
        <DropdownItem command="doc">文档</DropdownItem>
        <DropdownItem command="sheet">表格</DropdownItem>
      </template>
    </MenuButton>
  </div>
</template>
