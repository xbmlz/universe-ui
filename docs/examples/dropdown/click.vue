<script setup lang="ts">
import { Button, Dropdown, DropdownItem } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Dropdown trigger="click">
      <Button type="secondary">点击打开</Button>
      <template #menu>
        <DropdownItem command="copy">复制</DropdownItem>
        <DropdownItem command="move">移动到</DropdownItem>
        <DropdownItem command="rename">重命名</DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
