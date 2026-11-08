<script setup lang="ts">
import { Search } from '@icon-park/vue-next'
import { Button, Input, Select } from '@universe-ui/vue'
import ParkIcon from '../../../packages/vue/src/internal/park-icon.vue'
import { useDemo } from '../demo'

const {
  blues,
  typeScale,
  neutrals,
  radii,
  shadows,
  specOptions,
  specSizes,
} = useDemo()
</script>

<template>
  <section class="panel">
    <h2>尺寸对照</h2>
    <div class="spec-sizes">
      <template
        v-for="item in specSizes"
        :key="item.size"
      >
        <span class="spec-sizes__label">{{ item.label }}</span>
        <Input
          :size="item.size"
          placeholder="Please input"
        />
        <Input
          :size="item.size"
          placeholder="Please input"
        >
          <template #prefix>
            <ParkIcon :icon="Search" />
          </template>
        </Input>
        <span />
        <Select
          :size="item.size"
          :options="specOptions"
          placeholder="Please select"
        />
        <Select
          :size="item.size"
          multiple
          :max-tag-count="item.tags"
          :model-value="['a', 'b', 'c', 'd', 'e']"
          :options="specOptions"
        />
      </template>
    </div>
  </section>

  <section class="panel">
    <h2>尺寸</h2>
    <div class="row row--end">
      <Button
        type="primary"
        size="xl"
      >
        超大 48
      </Button>
      <Button
        type="primary"
        size="lg"
      >
        大 40
      </Button>
      <Button
        type="primary"
        size="md"
      >
        中 32
      </Button>
      <Button
        type="primary"
        size="sm"
      >
        小 28
      </Button>
      <Button
        type="primary"
        size="xs"
      >
        超小 24
      </Button>
    </div>
  </section>

  <section class="panel">
    <h2>PC 字阶</h2>
    <p
      v-for="[name, size, line, weight] in typeScale"
      :key="name"
      class="type-row"
      :style="{ fontSize: `${size}px`, lineHeight: `${line}px`, fontWeight: weight }"
    >
      <span>{{ name }}</span>
      <span class="type-row__meta">{{ size }} / {{ line }}</span>
    </p>
  </section>

  <section class="panel">
    <h2>品牌色</h2>
    <div class="swatches">
      <div
        v-for="[step, hex] in blues"
        :key="step"
        class="swatch"
      >
        <span
          class="swatch__chip"
          :style="{ background: hex }"
          :data-brand="step === '4'"
        />
        <span class="swatch__name">{{ step }}</span>
        <span class="swatch__hex">{{ hex }}</span>
      </div>
    </div>
  </section>

  <section class="panel">
    <h2>中性色</h2>
    <div class="swatches">
      <div
        v-for="[name, hex] in neutrals"
        :key="name"
        class="swatch"
      >
        <span
          class="swatch__chip"
          :style="{ background: hex }"
        />
        <span class="swatch__name">{{ name }}</span>
        <span class="swatch__hex">{{ hex }}</span>
      </div>
    </div>
  </section>

  <section class="panel">
    <h2>圆角</h2>
    <div class="row">
      <div
        v-for="[name, radius] in radii"
        :key="name"
        class="radius"
        :style="{ borderRadius: radius }"
      >
        {{ name }}
      </div>
    </div>
  </section>

  <section class="panel">
    <h2>向下投影</h2>
    <div class="row">
      <div
        v-for="level in shadows"
        :key="level"
        class="shadow"
        :style="{ boxShadow: `var(--ud-shadow-down-${level})` }"
      >
        {{ level.toUpperCase() }}
      </div>
    </div>
  </section>
</template>
