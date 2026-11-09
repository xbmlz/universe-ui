<script setup lang="ts">
import { SettingTwo } from '@icon-park/vue-next'
import { Avatar, Badge } from '@universe-ui/vue'
</script>

<template>
  <div class="ud-demo-row">
    <Badge round :icon="SettingTwo">
      <Avatar name="张三" />
    </Badge>
    <Badge round color="blue">
      <template #icon>
        <SettingTwo :size="8" />
      </template>
      <Avatar name="李四" />
    </Badge>
    <Badge :icon="SettingTwo">
      <Avatar name="王五" shape="square" />
    </Badge>
  </div>
</template>
