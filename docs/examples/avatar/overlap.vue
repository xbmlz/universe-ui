<script setup lang="ts">
import { Avatar, AvatarGroup } from '@universe-ui/vue'

const people = [
  { name: '林七七', color: 'blue' as const },
  { name: '王芳', color: 'purple' as const },
  { name: '陈晨', color: 'turquoise' as const },
  { name: '赵一', color: 'orange' as const },
  { name: 'John Smith', color: 'blue' as const },
  { name: '李雷', color: 'purple' as const },
  { name: '韩梅梅', color: 'turquoise' as const },
  { name: '周杰', color: 'orange' as const },
]
</script>

<template>
  <div class="ud-demo-col">
    <p class="avatar-overlap-hint">
      点击 +N 展开剩余人员
    </p>
    <AvatarGroup :size="32" :max="5">
      <Avatar
        v-for="person in people"
        :key="person.name"
        :name="person.name"
        :color="person.color"
      />
    </AvatarGroup>
    <AvatarGroup :size="24" :max="5">
      <Avatar
        v-for="person in people"
        :key="person.name"
        :name="person.name"
        :color="person.color"
      />
    </AvatarGroup>
    <AvatarGroup :size="20" :max="4">
      <Avatar
        v-for="person in people"
        :key="person.name"
        :name="person.name"
        :color="person.color"
      />
    </AvatarGroup>
  </div>
</template>

<style>
.avatar-overlap-hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}
</style>
