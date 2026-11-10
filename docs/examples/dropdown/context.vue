<script setup lang="ts">
import { Dropdown, DropdownItem } from '@universe-ui/vue'
import { ref } from 'vue'

const last = ref('—')
</script>

<template>
  <div class="ud-demo-col">
    <Dropdown
      trigger="contextmenu"
      @select="last = $event ?? '—'"
    >
      <div class="dropdown-context__pad">
        在此区域右键打开菜单
      </div>
      <template #menu>
        <DropdownItem command="refresh">刷新</DropdownItem>
        <DropdownItem command="inspect">检查</DropdownItem>
        <DropdownItem
          command="delete"
          danger
          divided
        >
          删除
        </DropdownItem>
      </template>
    </Dropdown>
    <p class="dropdown-context__hint">
      最近选择：{{ last }}
    </p>
  </div>
</template>

<style scoped>
.dropdown-context__pad {
  box-sizing: border-box;
  width: 100%;
  max-width: 360px;
  padding: 24px 16px;
  border: 1px dashed var(--ud-color-border);
  border-radius: var(--ud-radius-s);
  color: var(--ud-color-text-secondary);
  text-align: center;
}

.dropdown-context__hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body-sm);
  line-height: var(--ud-line-body-sm);
}
</style>
