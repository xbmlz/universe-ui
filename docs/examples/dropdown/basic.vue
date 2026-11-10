<script setup lang="ts">
import { Button, Dropdown, DropdownItem } from '@universe-ui/vue'
import { ref } from 'vue'

const last = ref('—')
</script>

<template>
  <div class="ud-demo-col">
    <Dropdown @select="last = $event ?? '—'">
      <Button type="secondary">更多操作</Button>
      <template #menu>
        <DropdownItem command="edit">编辑</DropdownItem>
        <DropdownItem command="share">分享</DropdownItem>
        <DropdownItem
          command="delete"
          danger
        >
          删除
        </DropdownItem>
      </template>
    </Dropdown>
    <p class="dropdown-basic__hint">
      最近选择：{{ last }}
    </p>
  </div>
</template>

<style scoped>
.dropdown-basic__hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
