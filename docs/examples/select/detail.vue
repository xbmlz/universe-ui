<script setup lang="ts">
import { SettingTwo } from '@icon-park/vue-next'
import { Select, Tooltip } from '@universe-ui/vue'
import { ref } from 'vue'

const value = ref<string | null>(null)
const options = [
  { value: 'design', label: '设计' },
  { value: 'develop', label: '研发' },
  { value: 'pm', label: '产品' },
]
</script>

<template>
  <div class="ud-demo-col" style="width: 100%; max-width: 320px">
    <Select
      v-model="value"
      :options="options"
      placeholder="选择角色"
    >
      <template #suffix>
        <span @click.stop>
          <Tooltip content="选项说明">
            <SettingTwo :size="16" fill="currentColor" />
          </Tooltip>
        </span>
      </template>
    </Select>
  </div>
</template>
