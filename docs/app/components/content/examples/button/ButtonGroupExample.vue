<script setup lang="ts">
import { Button, ButtonGroup, SplitButton } from '@universe-ui/vue'
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <ButtonGroup>
      <Button type="secondary">左侧</Button>
      <Button type="secondary">中间</Button>
      <Button type="secondary">右侧</Button>
    </ButtonGroup>

    <SplitButton text="保存" type="primary">
      <template #menu>
        <div class="px-3 py-2 text-sm text-muted">菜单内容由 DropdownItem 组成</div>
      </template>
    </SplitButton>
  </div>
</template>
