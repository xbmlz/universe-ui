<script setup lang="ts">
import type { PopoverPlacement } from '@universe-ui/vue'
import { Button, Popover } from '@universe-ui/vue'

const placements: PopoverPlacement[] = ['top', 'bottom', 'left', 'right']
</script>

<template>
  <div class="popover-placement">
    <Popover
      v-for="item in placements"
      :key="item"
      class="popover-placement__item"
      :class="`popover-placement__item--${item}`"
      trigger="click"
      type="info"
      :placement="item"
      title="标题"
      content="Here is the description content."
    >
      <Button type="secondary">{{ item }}</Button>
      <template #footer>
        <Button
          type="secondary"
          size="sm"
        >
          取消
        </Button>
        <Button
          type="primary"
          size="sm"
        >
          确认
        </Button>
      </template>
    </Popover>
  </div>
</template>

<style scoped>
.popover-placement {
  position: relative;
  box-sizing: border-box;
  width: min(100%, 420px);
  height: 280px;
  margin: 24px auto;
}

.popover-placement__item {
  position: absolute;
}

.popover-placement__item--top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.popover-placement__item--bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.popover-placement__item--left {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.popover-placement__item--right {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>
