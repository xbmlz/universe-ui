<script setup lang="ts">
import { Button, Dropdown, DropdownItem } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Button type="primary">保存</Button>
    <Dropdown trigger="click" placement="bottom-end">
      <Button type="secondary">更多</Button>
      <template #menu>
        <DropdownItem command="export">导出</DropdownItem>
        <DropdownItem command="history">历史版本</DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
