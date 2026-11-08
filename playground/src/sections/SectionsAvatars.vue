<script setup lang="ts">
import { Avatar, AvatarGroup } from '@universe-ui/vue'
import { useDemo } from '../demo'

const {
  people,
  avatarColors,
} = useDemo()
</script>

<template>
  <section class="panel">
    <h2>头像</h2>
    <div class="badges">
      <Avatar
        name="林七七"
        :size="40"
      />
      <Avatar
        name="John Smith"
        :size="40"
        color="purple"
      />
      <Avatar
        :size="40"
        color="turquoise"
      />
      <Avatar
        name="罗九"
        :size="40"
        color="orange"
      />
      <Avatar
        src="/avatar-sample.png"
        name="Lillian"
        :size="40"
      />
      <Avatar
        src="/missing.png"
        name="Wang Jun"
        :size="40"
      />
    </div>
    <div class="badges">
      <Avatar
        kind="group"
        name="A"
        :size="40"
      />
      <Avatar
        kind="group"
        name="中"
        :size="40"
        color="purple"
      />
      <Avatar
        kind="group"
        name="PRD"
        :size="40"
        color="turquoise"
      />
      <Avatar
        kind="group"
        name="中文"
        :size="40"
        color="green"
      />
      <Avatar
        kind="group"
        name="ABCDEFG"
        :size="40"
        color="lime"
      />
      <Avatar
        kind="group"
        name="沟通群"
        :size="40"
        color="yellow"
      />
      <Avatar
        kind="group"
        :size="40"
        color="orange"
      />
      <Avatar
        kind="group"
        name="TEXT"
        :size="40"
        color="carmine"
      />
    </div>
    <div class="badges">
      <Avatar
        kind="app"
        name="Design System"
        :size="40"
      />
      <Avatar
        kind="app"
        name="租户管理"
        :size="40"
        color="purple"
      />
      <Avatar
        kind="app"
        :size="40"
        color="green"
      />
      <Avatar
        kind="enterprise"
        name="飞书"
        :size="40"
        color="orange"
      />
      <Avatar
        kind="app"
        name="TT"
        :size="24"
      />
      <Avatar
        kind="app"
        name="Docs"
        shape="circle"
        :size="40"
      />
    </div>
    <div class="badges">
      <AvatarGroup
        v-for="size in [32, 24, 20]"
        :key="size"
        :size="size"
      >
        <Avatar
          v-for="person in people"
          :key="person"
          :name="person"
          :color="avatarColors[people.indexOf(person) % 4]"
        />
      </AvatarGroup>
    </div>
    <div class="badges">
      <AvatarGroup :size="32">
        <Avatar
          v-for="n in 6"
          :key="n"
          :name="people[n % people.length]"
        />
      </AvatarGroup>
      <AvatarGroup :size="32">
        <Avatar
          v-for="n in 1200"
          :key="n"
          name="多人"
        />
      </AvatarGroup>
      <AvatarGroup :size="24">
        <Avatar
          v-for="n in 120"
          :key="n"
          name="多人"
        />
      </AvatarGroup>
    </div>
  </section>
</template>
