<script setup lang="ts">
import { Button, Input, Tag } from '@universe-ui/vue'
import { ref } from 'vue'

const message = ref('Hello universe-ui')
</script>

<template>
  <div class="welcome">
    <h1>{{ message }}</h1>
    <Input
      v-model="message"
      placeholder="Try editing this value"
    />
    <div class="welcome__row">
      <Button type="primary">
        主要按钮
      </Button>
      <Button type="secondary">
        次要按钮
      </Button>
      <Tag color="blue">
        Tag
      </Tag>
    </div>
    <p class="welcome__hint">
      Edit src/App.vue and the preview updates instantly.
    </p>
  </div>
</template>

<style>
.welcome {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
}

.welcome h1 {
  margin: 0;
  font-size: 24px;
}

.welcome__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.welcome__hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: 13px;
}
</style>
