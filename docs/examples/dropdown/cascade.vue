<script setup lang="ts">
import { Button, Dropdown, DropdownItem } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Dropdown>
      <Button type="secondary">新建</Button>
      <template #menu>
        <DropdownItem command="doc">文档</DropdownItem>
        <DropdownItem command="sheet">表格</DropdownItem>
        <DropdownItem>
          多维表格
          <template #submenu>
            <DropdownItem command="bitable-blank">空白多维表格</DropdownItem>
            <DropdownItem command="bitable-template">从模板创建</DropdownItem>
            <DropdownItem
              command="bitable-import"
              hint="即将上线"
              disabled
            >
              导入
            </DropdownItem>
          </template>
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
