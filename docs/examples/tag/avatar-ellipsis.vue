<script setup lang="ts">
import { Plus } from '@icon-park/vue-next'
import { Avatar, Dropdown, DropdownItem, Tag } from '@universe-ui/vue'

const people = [
  { name: 'Julatte', src: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Danile', src: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Leon', src: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { name: 'Lynn Lee', src: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Neha', src: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { name: 'William', src: 'https://randomuser.me/api/portraits/men/43.jpg' },
  { name: 'James', src: 'https://randomuser.me/api/portraits/men/85.jpg' },
  { name: 'Mia', src: 'https://randomuser.me/api/portraits/women/90.jpg' },
  { name: 'Noah', src: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'Ava', src: 'https://randomuser.me/api/portraits/women/65.jpg' },
]

const visible = people.slice(0, 6)
const overflow = people.slice(6)
</script>

<template>
  <div class="tag-avatar-ellipsis">
    <div>
      <p class="tag-avatar-ellipsis__label">
        Tile display
      </p>
      <div class="tag-avatar-ellipsis__panel">
        <Tag
          v-for="person in people"
          :key="person.name"
          variant="avatar"
          :avatar-name="person.name"
          :avatar-src="person.src"
        >
          {{ person.name }}
        </Tag>
      </div>
    </div>

    <div>
      <p class="tag-avatar-ellipsis__label">
        Elliptical display logic
      </p>
      <div class="tag-avatar-ellipsis__panel">
        <Tag
          v-for="person in visible"
          :key="person.name"
          variant="avatar"
          :avatar-name="person.name"
          :avatar-src="person.src"
        >
          {{ person.name }}
        </Tag>
        <Dropdown trigger="click" placement="bottom-end">
          <button class="tag-avatar-ellipsis__more" type="button" aria-label="更多成员">
            <Plus :size="14" />
          </button>
          <template #menu>
            <DropdownItem v-for="person in overflow" :key="person.name">
              <span class="tag-avatar-ellipsis__menu-item">
                <Avatar :src="person.src" :name="person.name" :size="20" />
                {{ person.name }}
              </span>
            </DropdownItem>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-avatar-ellipsis {
  display: grid;
  gap: 24px;
}

.tag-avatar-ellipsis__label {
  margin: 0 0 8px;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-caption);
}

.tag-avatar-ellipsis__panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-m);
}

.tag-avatar-ellipsis__more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--ud-color-fill-tertiary);
  color: var(--ud-color-text-secondary);
  cursor: pointer;
}

.tag-avatar-ellipsis__more:hover {
  background: var(--ud-color-fill-secondary);
}

.tag-avatar-ellipsis__menu-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
