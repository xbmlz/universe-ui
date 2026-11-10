<script setup lang="ts">
import { Copy, Delete, Edit, Share } from '@icon-park/vue-next'
import { Button, Dropdown, DropdownItem } from '@universe-ui/vue'
import { ref } from 'vue'

const view = ref('list')

function onView(command?: string) {
  if (command === 'list' || command === 'board')
    view.value = command
}
</script>

<template>
  <div class="ud-demo-row">
    <Dropdown>
      <Button type="secondary">带图标与说明</Button>
      <template #menu>
        <DropdownItem command="edit">
          <template #icon>
            <Edit :size="16" />
          </template>
          编辑
        </DropdownItem>
        <DropdownItem
          command="copy"
          hint="Ctrl+C"
        >
          <template #icon>
            <Copy :size="16" />
          </template>
          复制
        </DropdownItem>
        <DropdownItem command="share">
          <template #icon>
            <Share :size="16" />
          </template>
          分享
        </DropdownItem>
        <DropdownItem
          command="delete"
          danger
          divided
        >
          <template #icon>
            <Delete :size="16" />
          </template>
          删除
        </DropdownItem>
      </template>
    </Dropdown>

    <Dropdown @select="onView">
      <Button type="secondary">
        视图 · {{ view === 'list' ? '列表' : '看板' }}
      </Button>
      <template #menu>
        <DropdownItem
          command="list"
          :selected="view === 'list'"
        >
          列表
        </DropdownItem>
        <DropdownItem
          command="board"
          :selected="view === 'board'"
        >
          看板
        </DropdownItem>
      </template>
    </Dropdown>
  </div>
</template>
