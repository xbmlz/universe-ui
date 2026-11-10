<script setup lang="ts">
import { Button, Dropdown, DropdownItem } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Dropdown>
      <Button type="secondary">分组</Button>
      <template #menu>
        <DropdownItem command="pin">置顶</DropdownItem>
        <DropdownItem command="star">加星标</DropdownItem>
        <DropdownItem
          command="archive"
          divided
        >
          归档
        </DropdownItem>
        <DropdownItem
          command="delete"
          danger
        >
          删除
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
