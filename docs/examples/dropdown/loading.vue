<script setup lang="ts">
import { Button, Dropdown, DropdownItem } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Dropdown loading>
      <Button type="secondary">加载中</Button>
      <template #menu>
        <DropdownItem command="a">选项 A</DropdownItem>
        <DropdownItem command="b">选项 B</DropdownItem>
        <DropdownItem command="c">选项 C</DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
