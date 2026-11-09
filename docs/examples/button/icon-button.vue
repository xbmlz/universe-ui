<script setup lang="ts">
import { Plus, Search, SettingTwo } from '@icon-park/vue-next'
import { Button, Tooltip } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Tooltip content="搜索" style="flex: 0 0 auto">
      <Button
        type="secondary"
        icon-only
        :icon="Search"
        aria-label="搜索"
      />
    </Tooltip>
    <Tooltip content="设置" style="flex: 0 0 auto">
      <Button
        type="text"
        icon-only
        :icon="SettingTwo"
        aria-label="设置"
      />
    </Tooltip>
    <Tooltip content="添加" style="flex: 0 0 auto">
      <Button
        type="secondary"
        icon-only
        round
        size="lg"
        :icon="Plus"
        aria-label="添加"
      />
    </Tooltip>
  </div>
</template>
