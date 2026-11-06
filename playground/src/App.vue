<script setup lang="ts" vapor>
import { computed, useTemplateRef, shallowRef } from 'vue'
import { Button, ButtonGroup, Checkbox, CheckboxGroup, Input, InputAddon, InputArea, InputChars, InputGroup, InputNumber, Select } from '@universe-ui/vue'
import type { InputAddonOption, SelectOption } from '@universe-ui/vue'
import { Info, Search } from '@icon-park/vue-next'
import ParkIcon from '../../packages/vue/src/internal/park-icon.vue'
import type { ButtonType } from '@universe-ui/vue'

const primaryRef = useTemplateRef<{ focus: () => void }>('primary')

const types: { type: ButtonType; label: string }[] = [
  { type: 'primary', label: '主要' },
  { type: 'danger', label: '主要危险' },
  { type: 'secondary-primary', label: '蓝色次要' },
  { type: 'secondary-danger', label: '次要危险' },
  { type: 'secondary', label: '次要' },
  { type: 'text', label: '文字' },
  { type: 'link', label: '链接' },
]

const blues = [
  ['1', '#002270'],
  ['2', '#002F9E'],
  ['3', '#0442D2'],
  ['4', '#1456F0'],
  ['5', '#336DF4'],
  ['6', '#5083FB'],
  ['7', '#7AA2FF'],
  ['8', '#94B4FF'],
  ['9', '#C2D4FF'],
  ['10', '#E0E9FF'],
  ['11', '#F0F4FF'],
]

const typeScale = [
  ['特大标题', 30, 46, 600],
  ['一级标题', 24, 36, 600],
  ['二级标题', 20, 30, 500],
  ['三级标题', 18, 28, 500],
  ['四级标题', 16, 24, 500],
  ['五级标题', 16, 24, 400],
  ['辅助标题', 14, 22, 500],
  ['正文', 14, 22, 400],
  ['正文辅助', 12, 20, 400],
  ['辅助', 12, 20, 500],
  ['小辅助', 10, 16, 500],
  ['最小辅助', 10, 16, 400],
] as const

const neutrals = [
  ['文字', '#1F2329'],
  ['次级文字', '#646A73'],
  ['占位', '#8F959E'],
  ['禁用', '#BBBFC4'],
  ['描边', '#D0D3D6'],
  ['卡片描边', '#DEE0E3'],
  ['背景 1', '#EFF0F1'],
  ['背景 2', '#F5F6F7'],
  ['背景 3', '#F8F9FA'],
  ['页面背景', '#F2F3F5'],
]

const radii = [
  ['XS 4', 'var(--ud-radius-xs)'],
  ['S 6', 'var(--ud-radius-s)'],
  ['M 8', 'var(--ud-radius-m)'],
  ['L 10', 'var(--ud-radius-l)'],
  ['Full', 'var(--ud-radius-full)'],
]

const shadows = ['s1', 's2', 's3', 's4', 's5']

const personName = shallowRef('')
const note = shallowRef('已填写的内容')
const keyword = shallowRef('已输入')
const days = shallowRef<number | null>(null)
const fixedDays = shallowRef<number | null>(5)
const rangeStart = shallowRef('')
const rangeEnd = shallowRef('')
const rangeDays = shallowRef<number | null>(null)
const otp = shallowRef('')
const otpSecret = shallowRef('')
const essay = shallowRef('')
const review = shallowRef('多行文本会在到达底部后向上滚动。\n第二行\n第三行\n第四行\n第五行\n第六行')
const overflowText = shallowRef('超出限制的字符会保留，并让边框和已输入字数进入错误态。')
const shortNote = shallowRef('')
const cities: SelectOption[] = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'shenzhen', label: '深圳' },
  { value: 'hangzhou', label: '杭州' },
  { value: 'chengdu', label: '成都是一个比较长的城市名，用来看省略' },
  { value: 'xian', label: '西安', disabled: true },
]
const countries: SelectOption[] = [
  'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'America', 'Aruba', 'Ascension Island', 'Australia', 'Austria',
].map((label) => ({ value: label, label }))
const specOptions: SelectOption[] = ['a', 'b', 'c', 'd', 'e'].map((value) => ({ value, label: 'Option' }))
const specSizes = [
  { size: 'sm', label: 'Small', tags: 2 },
  { size: 'md', label: 'Medium', tags: 2 },
  { size: 'lg', label: 'Large', tags: 1 },
] as const
const city = shallowRef<string | null>(null)
const found = shallowRef<string | null>(null)
const picked = shallowRef<string[]>([])
const packed = shallowRef(['beijing', 'shanghai', 'shenzhen', 'hangzhou'])
const site = shallowRef('')
const ratio = shallowRef('20')
const amount = shallowRef('8888')
const unitOptions: InputAddonOption[] = [
  { value: 'cny', label: '¥' },
  { value: 'usd', label: '$' },
  { value: 'eur', label: '€' },
]
const unit = shallowRef('cny')
const lengthUnits: InputAddonOption[] = [
  { value: 'mm', label: 'MM' },
  { value: 'cm', label: 'CM' },
  { value: 'dm', label: 'DM' },
]
const lengthUnit = shallowRef('cm')
const lengthValue = shallowRef('32')
const groupModes: SelectOption[] = [
  { value: 'a', label: 'Option 1' },
  { value: 'b', label: 'Option 2' },
  { value: 'c', label: 'Option 3' },
]
const groupMode = shallowRef('a')
const groupText = shallowRef('')
const wrappedOptions: SelectOption[] = [
  { value: 'short', label: 'Option 1' },
  { value: 'long', label: 'This option name is long enough to wrap onto a second line and still needs the full text in a tooltip' },
]
const meetingOptions = ['Option 1', 'Option 2', 'Option 3']
const meeting = shallowRef<string[]>(['Option 1'])
const meetingAll = computed(() => meeting.value.length === meetingOptions.length)
const meetingSome = computed(() => meeting.value.length > 0 && !meetingAll.value)
const rowOptions = shallowRef<string[]>(['mail'])
const agreed = shallowRef(false)

function setMeetingAll(next: boolean) {
  meeting.value = next ? [...meetingOptions] : []
}

function focusPrimary() {
  primaryRef.value?.focus()
}
</script>

<template>
  <main class="page">
    <header class="page__header">
      <p class="eyebrow">universe-ui</p>
      <h1>按钮和令牌</h1>
    </header>

    <section class="panel">
      <h2>基础按钮</h2>
      <div class="row">
        <Button ref="primary" type="primary">主要</Button>
        <Button v-for="item in types.slice(1)" :key="item.type" :type="item.type">
          {{ item.label }}
        </Button>
      </div>
      <div class="row">
        <Button type="primary" disabled>禁用</Button>
        <Button type="primary" loading>保存中</Button>
        <Button type="secondary" round>全圆角</Button>
        <button class="text-action" type="button" @click="focusPrimary">聚焦主要按钮</button>
      </div>
      <ButtonGroup>
        <Button type="primary">确定</Button>
        <Button>取消</Button>
      </ButtonGroup>
      <ButtonGroup size="sm">
        <Button type="primary">发送</Button>
        <Button>取消</Button>
      </ButtonGroup>
    </section>

    <section class="panel">
      <h2>主题</h2>
      <div class="row theme-green">
        <Button type="primary">改品牌色</Button>
        <Button type="secondary-primary">描边跟着变</Button>
      </div>
      <div class="row">
        <Button
          type="primary"
          style="--ud-button-bg: #ff811a; --ud-button-bg-hover: #ed6d0c; --ud-button-bg-active: #ff811a"
        >
          只改这一颗
        </Button>
      </div>
    </section>

    <section class="panel">
      <h2>输入框</h2>
      <div class="inputs">
        <Input v-model="personName" label="姓名" required placeholder="请输入" />
        <Input
          v-model="note"
          label="备注"
          message="最多两行说明。用于补充填写规则，超出后会截断。再写一行也仍然停在第二行，第三行不该出现。"
        />
        <Input error message="此项不能为空" placeholder="请输入" />
        <Input disabled placeholder="请输入" />
        <Input v-model="note" readonly />
        <Input borderless placeholder="无边框" />
        <div class="theme-green">
          <Input placeholder="描边跟着品牌色" style="--ud-input-border-color: var(--ud-color-brand)" />
        </div>
      </div>
      <div class="inputs">
        <Input size="sm" placeholder="小 28" />
        <Input size="md" placeholder="中 32" />
        <Input size="lg" placeholder="大 40" />
      </div>
      <h2>带图标</h2>
      <div class="inputs">
        <Input v-model="keyword" clearable placeholder="请输入">
          <template #prefix>
            <ParkIcon :icon="Search" size="16" />
          </template>
          <template #suffix>
            <ParkIcon :icon="Info" size="16" />
          </template>
        </Input>
        <p class="hint">当前内容 {{ keyword || '空' }}</p>
      </div>
      <h2>数字输入框</h2>
      <div class="inputs">
        <InputNumber v-model="days" label="年假天数" :min="1" :max="7" placeholder="请输入" />
        <p class="hint">当前值 {{ days ?? '空' }}</p>
        <InputNumber v-model="fixedDays" readonly />
        <InputNumber disabled placeholder="请输入" />
        <InputNumber error message="此项不能为空" placeholder="请输入" />
        <InputNumber size="sm" placeholder="小 28" />
        <InputNumber size="lg" placeholder="大 40" />
      </div>
      <h2>带属性</h2>
      <div class="inputs">
        <Input v-model="site" placeholder="请输入网址">
          <template #addon-before>Https://</template>
        </Input>
        <Input v-model="site" placeholder="请输入网址">
          <template #addon-before>Https://</template>
          <template #addon-after>.com</template>
        </Input>
        <Input v-model="ratio" placeholder="请输入">
          <template #addon-after>%</template>
        </Input>
        <Input v-model="amount" placeholder="请输入">
          <template #addon-before>
            <InputAddon v-model="unit" :options="unitOptions" />
          </template>
        </Input>
        <Input v-model="lengthValue" placeholder="Enter the Value">
          <template #addon-after>
            <InputAddon v-model="lengthUnit" :options="lengthUnits" />
          </template>
        </Input>
        <Input placeholder="Please enter text">
          <template #tag>English</template>
        </Input>
        <Input model-value="UniverseDesign" clearable>
          <template #suffix>
            <ParkIcon :icon="Info" />
          </template>
          <template #tag>English</template>
        </Input>
        <Input error message="此项不能为空" placeholder="Please enter text">
          <template #tag>English</template>
        </Input>
        <Input disabled placeholder="请输入">
          <template #addon-before>Https://</template>
        </Input>
        <Input model-value="universe.bytedance" readonly>
          <template #addon-before>Https://</template>
        </Input>
        <Input error message="此项不能为空" placeholder="请输入">
          <template #addon-before>Https://</template>
        </Input>
        <Input placeholder="请输入">
          <template #addon-before>这段前缀会在超过三百像素后省略，用来确认属性区不会跟着输入框继续变宽</template>
        </Input>
      </div>
      <h2>组合输入框</h2>
      <div class="inputs">
        <InputGroup>
          <Input v-model="rangeStart" placeholder="开始" />
          <Input v-model="rangeEnd" placeholder="结束" />
        </InputGroup>
        <p class="hint">当前内容 {{ rangeStart || '空' }} / {{ rangeEnd || '空' }}</p>
        <InputGroup disabled>
          <Input model-value="Content 1" />
          <Input model-value="Content 2" />
        </InputGroup>
        <InputGroup readonly>
          <Input model-value="Content 1" />
          <Input model-value="Content 2" />
        </InputGroup>
        <InputGroup error message="此项不能为空">
          <Input placeholder="开始" />
          <Input placeholder="结束" />
        </InputGroup>
        <InputGroup label="区间" required>
          <Input v-model="rangeStart" placeholder="开始" />
          <InputNumber v-model="rangeDays" placeholder="天数" />
        </InputGroup>
        <InputGroup>
          <Select v-model="groupMode" :options="groupModes" />
          <Input v-model="groupText" placeholder="Enter the text" />
        </InputGroup>
      </div>
      <h2>单字符</h2>
      <div class="inputs">
        <InputChars v-model="otp" :separator-after="[3]" />
        <p class="hint">当前验证码 {{ otp || '空' }}</p>
        <InputChars model-value="123456" disabled :separator-after="[3]" />
        <InputChars error message="此项不能为空" :separator-after="[3]" />
        <InputChars v-model="otpSecret" mask :separator-after="[3]" />
        <InputChars fill :separator-after="[3]" />
      </div>
      <h2>长文本</h2>
      <div class="inputs">
        <InputArea v-model="essay" autosize :maxlength="240" placeholder="请输入" />
        <p class="hint">当前字数 {{ essay.length }}</p>
        <InputArea v-model="review" :maxlength="240" />
        <InputArea model-value="已填写的内容" disabled :maxlength="240" />
        <InputArea model-value="只读的介绍" readonly :maxlength="240" />
        <InputArea v-model="overflowText" :maxlength="16" message="已超出字数限制" />
        <InputArea v-model="shortNote" :maxlength="8" truncate placeholder="最多 8 个字" />
      </div>
      <h2>选择器</h2>
      <div class="inputs inputs--select">
        <Select v-model="city" label="城市" required clearable :options="cities" />
        <p class="hint">当前城市 {{ city || '空' }}</p>
        <Select v-model="found" filterable clearable :options="cities" placeholder="搜索城市" />
        <p class="hint">搜索选中 {{ found || '空' }}</p>
        <Select v-model="picked" multiple filterable clearable :options="cities" />
        <p class="hint">已选 {{ picked.length ? picked.join('、') : '空' }}</p>
        <Select v-model="packed" multiple clearable :max-tag-count="1" :options="cities" />
        <Select model-value="beijing" disabled :options="cities" />
        <Select multiple disabled :model-value="['beijing', 'shanghai']" :options="cities" />
        <Select model-value="shanghai" readonly :options="cities" />
        <Select multiple readonly :model-value="['beijing', 'shanghai']" :options="cities" />
        <Select error message="此项不能为空" :options="cities" />
        <Select :options="[]" />
        <Select loading filterable :options="cities" placeholder="加载中" />
        <Select size="sm" :options="cities" />
        <Select size="lg" :options="cities" />
        <Select label="Country" :options="countries" placeholder="Please select" />
        <Select :options="wrappedOptions" :option-lines="2" placeholder="两行选项" />
      </div>
      <h2>复选框</h2>
      <div class="checks">
        <div class="check-block">
          <Checkbox :model-value="meetingAll" :indeterminate="meetingSome" @update:model-value="setMeetingAll">
            Select all
          </Checkbox>
          <CheckboxGroup v-model="meeting">
            <Checkbox v-for="option in meetingOptions" :key="option" :value="option">{{ option }}</Checkbox>
          </CheckboxGroup>
        </div>
        <CheckboxGroup v-model="rowOptions" direction="horizontal">
          <Checkbox value="mail">邮件</Checkbox>
          <Checkbox value="chat">会话</Checkbox>
          <Checkbox value="docs">文档</Checkbox>
        </CheckboxGroup>
        <Checkbox v-model="agreed">单独使用</Checkbox>
        <Checkbox model-value>已选中</Checkbox>
        <Checkbox indeterminate>部分选中</Checkbox>
        <Checkbox disabled>未选禁用</Checkbox>
        <Checkbox model-value disabled>已选禁用</Checkbox>
        <Checkbox indeterminate disabled>部分禁用</Checkbox>
        <Checkbox error>未选报错</Checkbox>
        <Checkbox>这是一段比较长的选项描述，用来看复选框和首行文字对齐。继续写到第二行，确认框还停在第一行中间。</Checkbox>
        <Checkbox align="center">这是一段比较长的选项描述，用来看复选框和整段文字居中。继续写到第二行，框应该对着两行的中线。</Checkbox>
        <Checkbox />
      </div>
      <h2>尺寸对照</h2>
      <div class="spec-sizes">
        <template v-for="item in specSizes" :key="item.size">
          <span class="spec-sizes__label">{{ item.label }}</span>
          <Input :size="item.size" placeholder="Please input" />
          <Input :size="item.size" placeholder="Please input">
            <template #prefix>
              <ParkIcon :icon="Search" />
            </template>
          </Input>
          <span />
          <Select :size="item.size" :options="specOptions" placeholder="Please select" />
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
        <Button type="primary" size="xl">超大 48</Button>
        <Button type="primary" size="lg">大 40</Button>
        <Button type="primary" size="md">中 32</Button>
        <Button type="primary" size="sm">小 28</Button>
        <Button type="primary" size="xs">超小 24</Button>
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
        <div v-for="[step, hex] in blues" :key="step" class="swatch">
          <span class="swatch__chip" :style="{ background: hex }" :data-brand="step === '4'" />
          <span class="swatch__name">{{ step }}</span>
          <span class="swatch__hex">{{ hex }}</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <h2>中性色</h2>
      <div class="swatches">
        <div v-for="[name, hex] in neutrals" :key="name" class="swatch">
          <span class="swatch__chip" :style="{ background: hex }" />
          <span class="swatch__name">{{ name }}</span>
          <span class="swatch__hex">{{ hex }}</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <h2>圆角</h2>
      <div class="row">
        <div v-for="[name, radius] in radii" :key="name" class="radius" :style="{ borderRadius: radius }">
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
  </main>
</template>

<style>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  color: var(--ud-color-text);
  font-family: var(--ud-font-family);
}

.page__header h1 {
  margin: 4px 0 0;
  font-size: var(--ud-font-size-h1);
  font-weight: var(--ud-font-weight-semibold);
  line-height: var(--ud-line-h1);
}

.eyebrow {
  margin: 0;
  color: var(--ud-color-brand);
  font-size: var(--ud-font-size-body);
  font-weight: var(--ud-font-weight-medium);
  line-height: var(--ud-line-body);
}

.panel {
  margin-top: 16px;
  padding: 20px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-l);
  background: var(--ud-color-bg-white);
}

.panel h2 {
  margin: 0 0 16px;
  font-size: var(--ud-font-size-h4);
  font-weight: var(--ud-font-weight-medium);
  line-height: var(--ud-line-h4);
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.row--end {
  align-items: flex-end;
}

.row:last-child,
.ud-button-group {
  margin-bottom: 12px;
}

.panel .ud-button-group:last-child {
  margin-bottom: 0;
}

.theme-green {
  --ud-color-brand: #32a645;
  --ud-color-brand-hover: #35bd4b;
  --ud-color-brand-pressed: #32a645;
  --ud-color-brand-loading: #35bd4b;
}

.inputs {
  display: grid;
  gap: 16px;
  margin-bottom: 16px;
}

.inputs:last-child {
  margin-bottom: 0;
}

.checks {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 360px;
}

.check-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.inputs--select .ud-select {
  max-width: 240px;
}

.spec-sizes {
  display: grid;
  grid-template-columns: 80px repeat(2, 240px);
  align-items: center;
  gap: 20px;
}

.spec-sizes > .ud-input,
.spec-sizes > .ud-select {
  min-width: 0;
}

.spec-sizes__label {
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
}

.hint {
  margin: 0;
  color: var(--ud-color-text-secondary);
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
}

.text-action {
  border: 0;
  background: transparent;
  color: var(--ud-color-brand);
  font: inherit;
  font-size: var(--ud-font-size-body);
  line-height: var(--ud-line-body);
  cursor: pointer;
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
  gap: 12px;
}

.swatch__chip {
  display: block;
  height: 48px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-s);
}

.swatch__chip[data-brand='true'] {
  outline: 2px solid var(--ud-color-brand);
  outline-offset: 2px;
}

.swatch__name,
.swatch__hex {
  display: block;
  margin-top: 6px;
  font-size: 12px;
}

.swatch__hex {
  color: var(--ud-color-text-secondary);
}

.type-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 0;
  color: var(--ud-color-text);
}

.type-row__meta {
  color: var(--ud-color-text-secondary);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.radius,
.shadow {
  display: grid;
  place-items: center;
  width: 96px;
  height: 64px;
  background: var(--ud-color-bg-white);
  color: var(--ud-color-text-secondary);
  font-size: 12px;
}

.radius {
  border: 1px solid var(--ud-color-border);
}

.shadow {
  border-radius: var(--ud-radius-m);
}
</style>
