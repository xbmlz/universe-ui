<script setup lang="ts" vapor>
import type { ButtonType, InputAddonOption, SelectOption } from '@universe-ui/vue'
import { Info, Remind, Search, Share, SmilingFace } from '@icon-park/vue-next'
import { Avatar, AvatarGroup, Badge, Breadcrumb, Button, ButtonGroup, Checkbox, CheckboxGroup, Collapse, CollapseItem, Dialog, Drawer, Dropdown, DropdownItem, Input, InputAddon, InputArea, InputChars, InputGroup, InputNumber, Notice, Notification, notification, Pagination, Placeholder, Popover, Progress, Radio, RadioGroup, Select, Skeleton, Spin, Steps, StepsItem, Switch, Tab, Tabs, Tag, Toast, toast } from '@universe-ui/vue'
import { computed, reactive, shallowRef, useTemplateRef } from 'vue'
import ParkIcon from '../../packages/vue/src/internal/park-icon.vue'

const primaryRef = useTemplateRef<{ focus: () => void }>('primary')

const types: { type: ButtonType, label: string }[] = [
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
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'America',
  'Aruba',
  'Ascension Island',
  'Australia',
  'Austria',
].map(label => ({ value: label, label }))
const specOptions: SelectOption[] = ['a', 'b', 'c', 'd', 'e'].map(value => ({ value, label: 'Option' }))
const specSizes = [
  { size: 'sm', label: 'Small', tags: 2 },
  { size: 'md', label: 'Medium', tags: 2 },
  { size: 'lg', label: 'Large', tags: 1 },
] as const
const city = shallowRef<string | null>(null)
const found = shallowRef<string | null>(null)
const picked = shallowRef<string[]>([])
const packed = shallowRef([
  'beijing',
  'shanghai',
  'shenzhen',
  'hangzhou',
])
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
const leaveUnit = shallowRef('day')
const priceMode = shallowRef('fixed')
const buttonChoice = shallowRef('a')
const notify = shallowRef(true)
const compact = shallowRef(false)
const tagSizes = ['xs', 'sm', 'md', 'lg'] as const
const labels = shallowRef(['设计', '研发', '测试'])

const lineSizes = ['lg', 'md', 'sm'] as const
const lineTab = shallowRef('t1')
const capsuleTab = shallowRef('c1')
const unread = shallowRef(5)
const masked = shallowRef(true)
const progressValue = shallowRef(50)
const noticeOpen = shallowRef(true)
const dialogs = reactive({
  basic: false,
  custom: false,
  scroll: false,
  three: false,
  vertical: false,
  nested: false,
})
const dialogLog = shallowRef('')
const drawers = reactive({
  basic: false,
  rich: false,
  avatar: false,
  tabs: false,
  modal: false,
  push: false,
})
const drawerTab = shallowRef('t1')
const drawerLog = shallowRef('')
const files = Array.from({ length: 12 }, (_, index) => `File name ${index + 1}.zip`)

function saveLater() {
  return new Promise<boolean>(resolve => setTimeout(resolve, 1000, true))
}

function showLoadingToast() {
  const handle = toast.loading('正在上传')
  setTimeout(() => handle.update({ type: 'success', content: '上传成功' }), 3000)
}
const delayed = shallowRef(false)
const popoverClick = shallowRef(false)
const popoverLoading = shallowRef(true)
const popoverLog = shallowRef('')
const dropdownClick = shallowRef(false)
const dropdownLoading = shallowRef(true)
const dropdownLog = shallowRef('')
const collapseLine = shallowRef<Array<string | number>>(['expanded'])
const collapseCaret = shallowRef<Array<string | number>>(['c-expanded'])
const collapseAcc = shallowRef<Array<string | number>>(['a1'])
const crumbLog = shallowRef('')
const stepActive = shallowRef(1)
const stepLog = shallowRef('第 2 步')
const page = shallowRef(1)
const pageSize = shallowRef(10)
const pageLog = shallowRef('第 1 页')
const lonePage = shallowRef(1)
const smallPage = shallowRef(1)
const crumbs = [
  { label: 'Home' },
  { label: 'Project' },
  { label: 'Current' },
]
const longCrumbs = [
  { label: 'Home' },
  { label: 'Project n-1' },
  { label: 'Project n-2' },
  { label: 'Project' },
  { label: 'Current' },
]
const wideCrumbs = [
  { label: 'Home' },
  { label: '这是一个超过十个汉字的层级名称需要省略' },
  { label: 'Current' },
]
const people = [
  '林七七',
  'John Smith',
  '工藤新一',
  'Wang Jun',
  '罗九',
  'Memo',
  'Loen',
]
const avatarColors = [
  'blue',
  'purple',
  'turquoise',
  'orange',
] as const

function removeLabel(label: string) {
  labels.value = labels.value.filter(item => item !== label)
}

function setMeetingAll(next: boolean) {
  meeting.value = next
    ? [...meetingOptions]
    : []
}

function focusPrimary() {
  primaryRef.value?.focus()
}
</script>

<template>
  <main class="page">
    <header class="page__header">
      <p class="eyebrow">
        universe-ui
      </p>
      <h1>按钮和令牌</h1>
    </header>

    <section class="panel">
      <h2>基础按钮</h2>
      <div class="row">
        <Button
          ref="primary"
          type="primary"
        >
          主要
        </Button>
        <Button
          v-for="item in types.slice(1)"
          :key="item.type"
          :type="item.type"
        >
          {{ item.label }}
        </Button>
      </div>
      <div class="row">
        <Button
          type="primary"
          disabled
        >
          禁用
        </Button>
        <Button
          type="primary"
          loading
        >
          保存中
        </Button>
        <Button
          type="secondary"
          round
        >
          全圆角
        </Button>
        <button
          class="text-action"
          type="button"
          @click="focusPrimary"
        >
          聚焦主要按钮
        </button>
      </div>
      <ButtonGroup>
        <Button type="primary">
          确定
        </Button>
        <Button>取消</Button>
      </ButtonGroup>
      <ButtonGroup size="sm">
        <Button type="primary">
          发送
        </Button>
        <Button>取消</Button>
      </ButtonGroup>
    </section>

    <section class="panel">
      <h2>主题</h2>
      <div class="row theme-green">
        <Button type="primary">
          改品牌色
        </Button>
        <Button type="secondary-primary">
          描边跟着变
        </Button>
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
        <Input
          v-model="personName"
          label="姓名"
          required
          placeholder="请输入"
        />
        <Input
          v-model="note"
          label="备注"
          message="最多两行说明。用于补充填写规则，超出后会截断。再写一行也仍然停在第二行，第三行不该出现。"
        />
        <Input
          error
          message="此项不能为空"
          placeholder="请输入"
        />
        <Input
          disabled
          placeholder="请输入"
        />
        <Input
          v-model="note"
          readonly
        />
        <Input
          borderless
          placeholder="无边框"
        />
        <div class="theme-green">
          <Input
            placeholder="描边跟着品牌色"
            style="--ud-input-border-color: var(--ud-color-brand)"
          />
        </div>
      </div>
      <div class="inputs">
        <Input
          size="sm"
          placeholder="小 28"
        />
        <Input
          size="md"
          placeholder="中 32"
        />
        <Input
          size="lg"
          placeholder="大 40"
        />
      </div>
      <h2>带图标</h2>
      <div class="inputs">
        <Input
          v-model="keyword"
          clearable
          placeholder="请输入"
        >
          <template #prefix>
            <ParkIcon
              :icon="Search"
              size="16"
            />
          </template>
          <template #suffix>
            <ParkIcon
              :icon="Info"
              size="16"
            />
          </template>
        </Input>
        <p class="hint">
          当前内容 {{ keyword || '空' }}
        </p>
      </div>
      <h2>数字输入框</h2>
      <div class="inputs">
        <InputNumber
          v-model="days"
          label="年假天数"
          :min="1"
          :max="7"
          placeholder="请输入"
        />
        <p class="hint">
          当前值 {{ days ?? '空' }}
        </p>
        <InputNumber
          v-model="fixedDays"
          readonly
        />
        <InputNumber
          disabled
          placeholder="请输入"
        />
        <InputNumber
          error
          message="此项不能为空"
          placeholder="请输入"
        />
        <InputNumber
          size="sm"
          placeholder="小 28"
        />
        <InputNumber
          size="lg"
          placeholder="大 40"
        />
      </div>
      <h2>带属性</h2>
      <div class="inputs">
        <Input
          v-model="site"
          placeholder="请输入网址"
        >
          <template #addon-before>
            Https://
          </template>
        </Input>
        <Input
          v-model="site"
          placeholder="请输入网址"
        >
          <template #addon-before>
            Https://
          </template>
          <template #addon-after>
            .com
          </template>
        </Input>
        <Input
          v-model="ratio"
          placeholder="请输入"
        >
          <template #addon-after>
            %
          </template>
        </Input>
        <Input
          v-model="amount"
          placeholder="请输入"
        >
          <template #addon-before>
            <InputAddon
              v-model="unit"
              :options="unitOptions"
            />
          </template>
        </Input>
        <Input
          v-model="lengthValue"
          placeholder="Enter the Value"
        >
          <template #addon-after>
            <InputAddon
              v-model="lengthUnit"
              :options="lengthUnits"
            />
          </template>
        </Input>
        <Input placeholder="Please enter text">
          <template #tag>
            English
          </template>
        </Input>
        <Input
          model-value="UniverseDesign"
          clearable
        >
          <template #suffix>
            <ParkIcon :icon="Info" />
          </template>
          <template #tag>
            English
          </template>
        </Input>
        <Input
          error
          message="此项不能为空"
          placeholder="Please enter text"
        >
          <template #tag>
            English
          </template>
        </Input>
        <Input
          disabled
          placeholder="请输入"
        >
          <template #addon-before>
            Https://
          </template>
        </Input>
        <Input
          model-value="universe.bytedance"
          readonly
        >
          <template #addon-before>
            Https://
          </template>
        </Input>
        <Input
          error
          message="此项不能为空"
          placeholder="请输入"
        >
          <template #addon-before>
            Https://
          </template>
        </Input>
        <Input placeholder="请输入">
          <template #addon-before>
            这段前缀会在超过三百像素后省略，用来确认属性区不会跟着输入框继续变宽
          </template>
        </Input>
      </div>
      <h2>组合输入框</h2>
      <div class="inputs">
        <InputGroup>
          <Input
            v-model="rangeStart"
            placeholder="开始"
          />
          <Input
            v-model="rangeEnd"
            placeholder="结束"
          />
        </InputGroup>
        <p class="hint">
          当前内容 {{ rangeStart || '空' }} / {{ rangeEnd || '空' }}
        </p>
        <InputGroup disabled>
          <Input model-value="Content 1" />
          <Input model-value="Content 2" />
        </InputGroup>
        <InputGroup readonly>
          <Input model-value="Content 1" />
          <Input model-value="Content 2" />
        </InputGroup>
        <InputGroup
          error
          message="此项不能为空"
        >
          <Input placeholder="开始" />
          <Input placeholder="结束" />
        </InputGroup>
        <InputGroup
          label="区间"
          required
        >
          <Input
            v-model="rangeStart"
            placeholder="开始"
          />
          <InputNumber
            v-model="rangeDays"
            placeholder="天数"
          />
        </InputGroup>
        <InputGroup>
          <Select
            v-model="groupMode"
            :options="groupModes"
          />
          <Input
            v-model="groupText"
            placeholder="Enter the text"
          />
        </InputGroup>
      </div>
      <h2>单字符</h2>
      <div class="inputs">
        <InputChars
          v-model="otp"
          :separator-after="[3]"
        />
        <p class="hint">
          当前验证码 {{ otp || '空' }}
        </p>
        <InputChars
          model-value="123456"
          disabled
          :separator-after="[3]"
        />
        <InputChars
          error
          message="此项不能为空"
          :separator-after="[3]"
        />
        <InputChars
          v-model="otpSecret"
          mask
          :separator-after="[3]"
        />
        <InputChars
          fill
          :separator-after="[3]"
        />
      </div>
      <h2>长文本</h2>
      <div class="inputs">
        <InputArea
          v-model="essay"
          autosize
          :maxlength="240"
          placeholder="请输入"
        />
        <p class="hint">
          当前字数 {{ essay.length }}
        </p>
        <InputArea
          v-model="review"
          :maxlength="240"
        />
        <InputArea
          model-value="已填写的内容"
          disabled
          :maxlength="240"
        />
        <InputArea
          model-value="只读的介绍"
          readonly
          :maxlength="240"
        />
        <InputArea
          v-model="overflowText"
          :maxlength="16"
          message="已超出字数限制"
        />
        <InputArea
          v-model="shortNote"
          :maxlength="8"
          truncate
          placeholder="最多 8 个字"
        />
      </div>
      <h2>选择器</h2>
      <div class="inputs inputs--select">
        <Select
          v-model="city"
          label="城市"
          required
          clearable
          :options="cities"
        />
        <p class="hint">
          当前城市 {{ city || '空' }}
        </p>
        <Select
          v-model="found"
          filterable
          clearable
          :options="cities"
          placeholder="搜索城市"
        />
        <p class="hint">
          搜索选中 {{ found || '空' }}
        </p>
        <Select
          v-model="picked"
          multiple
          filterable
          clearable
          :options="cities"
        />
        <p class="hint">
          已选 {{ picked.length ? picked.join('、') : '空' }}
        </p>
        <Select
          v-model="packed"
          multiple
          clearable
          :max-tag-count="1"
          :options="cities"
        />
        <Select
          model-value="beijing"
          disabled
          :options="cities"
        />
        <Select
          multiple
          disabled
          :model-value="['beijing', 'shanghai']"
          :options="cities"
        />
        <Select
          model-value="shanghai"
          readonly
          :options="cities"
        />
        <Select
          multiple
          readonly
          :model-value="['beijing', 'shanghai']"
          :options="cities"
        />
        <Select
          error
          message="此项不能为空"
          :options="cities"
        />
        <Select :options="[]" />
        <Select
          loading
          filterable
          :options="cities"
          placeholder="加载中"
        />
        <Select
          size="sm"
          :options="cities"
        />
        <Select
          size="lg"
          :options="cities"
        />
        <Select
          label="Country"
          :options="countries"
          placeholder="Please select"
        />
        <Select
          :options="wrappedOptions"
          :option-lines="2"
          placeholder="两行选项"
        />
      </div>
      <h2>复选框</h2>
      <div class="checks">
        <div class="check-block">
          <Checkbox
            :model-value="meetingAll"
            :indeterminate="meetingSome"
            @update:model-value="setMeetingAll"
          >
            Select all
          </Checkbox>
          <CheckboxGroup v-model="meeting">
            <Checkbox
              v-for="option in meetingOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </Checkbox>
          </CheckboxGroup>
        </div>
        <CheckboxGroup
          v-model="rowOptions"
          direction="horizontal"
        >
          <Checkbox value="mail">
            邮件
          </Checkbox>
          <Checkbox value="chat">
            会话
          </Checkbox>
          <Checkbox value="docs">
            文档
          </Checkbox>
        </CheckboxGroup>
        <Checkbox v-model="agreed">
          单独使用
        </Checkbox>
        <Checkbox model-value>
          已选中
        </Checkbox>
        <Checkbox indeterminate>
          部分选中
        </Checkbox>
        <Checkbox disabled>
          未选禁用
        </Checkbox>
        <Checkbox
          model-value
          disabled
        >
          已选禁用
        </Checkbox>
        <Checkbox
          indeterminate
          disabled
        >
          部分禁用
        </Checkbox>
        <Checkbox error>
          未选报错
        </Checkbox>
        <Checkbox>这是一段比较长的选项描述，用来看复选框和首行文字对齐。继续写到第二行，确认框还停在第一行中间。</Checkbox>
        <Checkbox align="center">
          这是一段比较长的选项描述，用来看复选框和整段文字居中。继续写到第二行，框应该对着两行的中线。
        </Checkbox>
        <Checkbox />
      </div>
      <h2>单选框</h2>
      <div class="checks">
        <RadioGroup v-model="leaveUnit">
          <Radio value="day">
            按天
          </Radio>
          <Radio value="hour">
            按小时
          </Radio>
          <Radio
            value="minute"
            disabled
          >
            按分钟
          </Radio>
        </RadioGroup>
        <p class="hint">
          请假单位 {{ leaveUnit }}
        </p>
        <RadioGroup
          v-model="priceMode"
          direction="horizontal"
        >
          <Radio value="fixed">
            固定
          </Radio>
          <Radio value="tier">
            阶梯
          </Radio>
          <Radio value="free">
            免费
          </Radio>
        </RadioGroup>
        <Radio
          model-value="on"
          value="on"
          disabled
        >
          已选禁用
        </Radio>
        <Radio
          error
          value="bad"
        >
          未选报错
        </Radio>
        <Radio value="long">
          这是一段比较长的选项描述，用来看单选框和首行文字对齐。继续写到第二行，确认圆点还停在第一行中间。
        </Radio>
        <Radio
          value="long-center"
          align="center"
        >
          这是一段比较长的选项描述，用来看单选框和整段文字居中。继续写到第二行，圆点应该对着两行的中线。
        </Radio>
        <RadioGroup
          v-model="buttonChoice"
          variant="button"
          size="sm"
        >
          <Radio value="a">
            Option 1
          </Radio>
          <Radio value="b">
            Option 2
          </Radio>
          <Radio value="c">
            Option 3
          </Radio>
        </RadioGroup>
        <RadioGroup
          v-model="buttonChoice"
          variant="button"
        >
          <Radio value="a">
            Option 1
          </Radio>
          <Radio value="b">
            Option 2
          </Radio>
          <Radio value="c">
            Option 3
          </Radio>
        </RadioGroup>
        <RadioGroup
          v-model="buttonChoice"
          variant="button"
          size="lg"
        >
          <Radio value="a">
            Option 1
          </Radio>
          <Radio value="b">
            Option 2
          </Radio>
          <Radio
            value="c"
            disabled
          >
            Option 3
          </Radio>
        </RadioGroup>
        <RadioGroup
          model-value="long"
          variant="button"
        >
          <Radio
            class="radio-narrow"
            value="long"
          >
            这是一段放不进按钮的选项名称
          </Radio>
          <Radio value="short">
            短
          </Radio>
        </RadioGroup>
        <RadioGroup
          model-value="on"
          variant="button"
        >
          <Radio
            value="on"
            disabled
          >
            已选禁用
          </Radio>
        </RadioGroup>
      </div>
      <h2>开关</h2>
      <div class="switches">
        <Switch
          v-model="notify"
          aria-label="消息通知"
        />
        <Switch
          v-model="compact"
          size="sm"
          aria-label="紧凑模式"
        />
        <p class="hint">
          消息通知 {{ notify ? '开' : '关' }}，紧凑模式 {{ compact ? '开' : '关' }}
        </p>
      </div>
      <div class="switches">
        <Switch model-value />
        <Switch
          model-value
          disabled
        />
        <Switch
          model-value
          loading
        />
        <Switch />
        <Switch disabled />
        <Switch loading />
      </div>
      <div class="switches">
        <Switch
          model-value
          size="sm"
        />
        <Switch
          model-value
          size="sm"
          disabled
        />
        <Switch
          model-value
          size="sm"
          loading
        />
        <Switch size="sm" />
        <Switch
          size="sm"
          disabled
        />
        <Switch
          size="sm"
          loading
        />
      </div>
      <h2>标签</h2>
      <div class="tags">
        <Tag>Department</Tag>
        <Tag color="blue">
          Department
        </Tag>
        <Tag
          color="blue"
          solid
        >
          Solid
        </Tag>
        <Tag>
          <template #icon>
            <ParkIcon
              :icon="SmilingFace"
              theme="filled"
            />
          </template>
          Tag
        </Tag>
        <Tag color="blue">
          <template #icon>
            <ParkIcon
              :icon="SmilingFace"
              theme="filled"
            />
          </template>
        </Tag>
        <Tag closable>
          Tag
        </Tag>
        <Tag disabled>
          Tag
        </Tag>
        <Tag
          color="blue"
          disabled
          closable
        >
          Tag
        </Tag>
      </div>
      <div
        v-for="size in tagSizes"
        :key="size"
        class="tags"
      >
        <Tag
          variant="option"
          :size="size"
          closable
        >
          <template #icon>
            <ParkIcon
              :icon="SmilingFace"
              theme="filled"
            />
          </template>
          Options tag
        </Tag>
        <Tag
          variant="option"
          :size="size"
          color="blue"
          closable
        >
          <template #icon>
            <ParkIcon
              :icon="SmilingFace"
              theme="filled"
            />
          </template>
          Options tag
        </Tag>
        <Tag
          variant="option"
          :size="size"
        >
          +4
        </Tag>
        <Tag
          variant="option"
          :size="size"
          disabled
          closable
        >
          Options tag
        </Tag>
        <Tag
          variant="option"
          :size="size"
          color="blue"
          disabled
          closable
        >
          Options tag
        </Tag>
      </div>
      <div class="tags">
        <Tag
          v-for="label in labels"
          :key="label"
          variant="option"
          closable
          @close="removeLabel(label)"
        >
          {{ label }}
        </Tag>
        <Tag
          variant="option"
          class="tag-narrow"
        >
          这是一段放不进标签的很长的文字
        </Tag>
        <p class="hint">
          剩余 {{ labels.join('、') || '空' }}
        </p>
      </div>
      <h2>标签页</h2>
      <div class="tabs-demo">
        <Tabs
          v-for="size in lineSizes"
          :key="size"
          v-model="lineTab"
          :size="size"
        >
          <Tab value="t1">
            Tab
          </Tab>
          <Tab value="t2">
            Tab
          </Tab>
          <Tab value="t3">
            Tab
          </Tab>
          <Tab
            value="t4"
            disabled
          >
            Tab
          </Tab>
          <Tab value="t5">
            Tab
          </Tab>
        </Tabs>
        <Tabs
          v-model="lineTab"
          divider
          style="align-self: stretch"
        >
          <Tab value="t1">
            Tab1
          </Tab>
          <Tab value="t2">
            Tab2
          </Tab>
          <Tab value="t3">
            Tab3
          </Tab>
          <Tab
            value="t4"
            disabled
          >
            Tab4
          </Tab>
          <Tab value="t5">
            很长的标签名字
          </Tab>
        </Tabs>
        <Tabs
          v-model="capsuleTab"
          variant="capsule"
        >
          <Tab value="c1">
            Tab 1
          </Tab>
          <Tab value="c2">
            Tab 2
          </Tab>
          <Tab value="c3">
            Tab 3
          </Tab>
          <Tab
            value="c4"
            disabled
          >
            Tab 4
          </Tab>
          <Tab value="c5">
            比较长的标签
          </Tab>
        </Tabs>
        <Tabs
          v-model="capsuleTab"
          variant="capsule"
          size="sm"
        >
          <Tab value="c1">
            Tab 1
          </Tab>
          <Tab value="c2">
            Tab 2
          </Tab>
          <Tab value="c3">
            Tab 3
          </Tab>
          <Tab
            value="c4"
            disabled
          >
            Tab 4
          </Tab>
          <Tab value="c5">
            比较长的标签
          </Tab>
        </Tabs>
        <p class="hint">
          线条 {{ lineTab }}，胶囊 {{ capsuleTab }}
        </p>
      </div>
      <h2>徽标</h2>
      <div class="badges">
        <Badge
          dot
          dot-size="sm"
        />
        <Badge dot />
        <Badge
          dot
          dot-size="lg"
        />
        <Badge
          dot
          color="grey"
        />
        <Badge
          dot
          color="green"
        />
        <Badge
          dot
          color="blue"
        />
        <Badge
          dot
          outline
        />
      </div>
      <div class="badges">
        <Badge :count="8" />
        <Badge :count="99" />
        <Badge :count="999" />
        <Badge :count="1000" />
        <Badge count="New" />
        <Badge
          :count="38"
          color="grey"
        />
        <Badge
          :count="142"
          plain
        />
        <Badge :count="0" />
        <Badge
          :count="0"
          show-zero
        />
      </div>
      <div class="badges">
        <Badge :count="unread">
          <span class="badge-icon"><ParkIcon :icon="Remind" /></span>
        </Badge>
        <Badge dot>
          <span class="badge-icon"><ParkIcon :icon="Remind" /></span>
        </Badge>
        <Badge
          :count="unread"
          round
        >
          <span class="badge-avatar">张</span>
        </Badge>
        <Badge
          dot
          dot-size="lg"
          round
        >
          <span class="badge-avatar">李</span>
        </Badge>
        <Badge
          dot
          color="blue"
          round
          placement="bottom-right"
        >
          <span class="badge-avatar">王</span>
        </Badge>
        <Button
          size="sm"
          @click="unread += 9"
        >
          加 9
        </Button>
        <Button
          size="sm"
          @click="unread = 0"
        >
          清零
        </Button>
      </div>
      <h2>占位符</h2>
      <div class="badges">
        <Placeholder />
        <Placeholder type="failure" />
        <Placeholder :size="24" />
        <Placeholder
          :size="18"
          type="failure"
        />
        <Placeholder :size="48" />
        <Placeholder
          :size="48"
          type="failure"
        />
      </div>
      <h2>加载</h2>
      <div class="badges">
        <Spin size="sm" />
        <Spin />
        <Spin size="lg" />
        <Spin :size="32" />
        <span class="spin-dark"><Spin color="white" /></span>
        <span class="spin-grey"><Spin color="grey" /></span>
      </div>
      <div class="badges">
        <Spin
          size="sm"
          tip="Description Copy"
        />
        <Spin tip="Description Copy" />
        <Spin
          size="lg"
          tip="Description Copy"
        />
        <Spin
          size="sm"
          direction="horizontal"
          tip="Description Copy"
        />
        <Spin
          direction="horizontal"
          tip="Description Copy"
        />
      </div>
      <div class="badges">
        <Spin
          :spinning="masked"
          size="lg"
          class="spin-module"
        >
          <div class="spin-module__body">
            <p>被蒙层覆盖的模块内容</p>
            <p>第二行文字</p>
          </div>
        </Spin>
        <Button
          size="sm"
          @click="masked = !masked"
        >
          {{ masked ? '结束加载' : '开始加载' }}
        </Button>
        <Spin
          :spinning="delayed"
          :delay="1000"
          tip="延迟 1 秒显示"
        />
        <Button
          size="sm"
          @click="delayed = !delayed"
        >
          {{ delayed ? '停止' : '开始（延迟）' }}
        </Button>
      </div>
      <div class="badges skeleton-demo">
        <Skeleton
          variant="circle"
          :width="32"
        />
        <Skeleton
          :rows="2"
          :width="170"
          style="font-size: 12px"
        />
        <Skeleton
          variant="rect"
          :width="124"
          :height="46"
        />
      </div>
      <h2>气泡卡片</h2>
      <div class="badges">
        <Popover
          content="Here is the description content."
        >
          <Button>悬停</Button>
        </Popover>
        <Popover
          title="Title"
          content="Here is the description content."
          type="info"
        >
          <Button type="secondary">
            带标题
          </Button>
        </Popover>
        <Popover
          title="Title"
          content="Here is the description content."
          type="success"
          size="lg"
          title-strong
        >
          <Button type="secondary">
            大尺寸
          </Button>
        </Popover>
        <Popover
          v-model:open="popoverClick"
          trigger="click"
          title="Title"
          content="Here is the description content."
          type="info"
          placement="bottom"
        >
          <template #footer>
            <Button
              type="secondary"
              size="sm"
              @click="popoverClick = false"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              @click="popoverClick = false; popoverLog = 'confirmed'"
            >
              Confirm
            </Button>
          </template>
          <Button>点击</Button>
        </Popover>
        <Popover
          title="Title"
          :loading="popoverLoading"
          content="加载完成后仍保持同样的宽度。"
        >
          <Button
            type="secondary"
            @click="popoverLoading = !popoverLoading"
          >
            {{ popoverLoading ? '加载中' : '加载完成' }}
          </Button>
        </Popover>
        <Popover
          title="Title"
          placement="right"
        >
          <template #content>
            <p
              v-for="n in 12"
              :key="n"
              style="margin: 0 0 8px"
            >
              第 {{ n }} 行说明，超过最大高度后在卡片内滚动。
            </p>
          </template>
          <template #footer>
            <Button size="sm">
              Confirm
            </Button>
          </template>
          <Button type="secondary">
            滚动
          </Button>
        </Popover>
      </div>
      <p class="hint">
        {{ popoverLog }}
      </p>
      <h2>下拉菜单</h2>
      <div class="badges">
        <Dropdown @select="dropdownLog = String($event)">
          <template #menu>
            <DropdownItem command="option-1">
              Option 1
            </DropdownItem>
            <DropdownItem command="option-2">
              Option 2
            </DropdownItem>
            <DropdownItem command="option-3">
              Option 3
            </DropdownItem>
          </template>
          <Button>悬停</Button>
        </Dropdown>
        <Dropdown
          v-model:open="dropdownClick"
          trigger="click"
          @select="dropdownLog = String($event)"
        >
          <template #menu>
            <DropdownItem command="copy">
              <template #icon>
                <ParkIcon :icon="Share" />
              </template>
              复制
            </DropdownItem>
            <DropdownItem
              command="more"
              hint="更多"
            >
              带说明
              <template #submenu>
                <DropdownItem
                  command="zh"
                  selected
                >
                  中文
                </DropdownItem>
                <DropdownItem command="en">
                  English
                </DropdownItem>
                <DropdownItem command="ja">
                  日本語
                </DropdownItem>
              </template>
            </DropdownItem>
            <DropdownItem
              divided
              danger
              command="delete"
            >
              删除
            </DropdownItem>
            <DropdownItem
              disabled
              command="disabled"
            >
              禁用
            </DropdownItem>
          </template>
          <Button type="secondary">
            点击
          </Button>
        </Dropdown>
        <Dropdown
          :loading="dropdownLoading"
          @select="dropdownLog = String($event)"
        >
          <template #menu>
            <DropdownItem command="a">
              加载完成后保持宽度
            </DropdownItem>
            <DropdownItem command="b">
              第二条
            </DropdownItem>
          </template>
          <Button
            type="secondary"
            @click="dropdownLoading = !dropdownLoading"
          >
            {{ dropdownLoading ? '加载中' : '加载完成' }}
          </Button>
        </Dropdown>
        <Dropdown
          :width="160"
          @select="dropdownLog = String($event)"
        >
          <template #menu>
            <DropdownItem
              v-for="n in 16"
              :key="n"
              :command="`row-${n}`"
            >
              比较长的菜单项 {{ n }}
            </DropdownItem>
          </template>
          <Button type="secondary">
            滚动
          </Button>
        </Dropdown>
      </div>
      <p class="hint">
        {{ dropdownLog }}
      </p>
      <h2>折叠面板</h2>
      <div class="collapse-demo">
        <Collapse
          v-model="collapseLine"
          bordered
        >
          <CollapseItem
            name="loading"
            title="Loading"
            loading
          />
          <CollapseItem
            name="disabled"
            title="Disabled"
            disabled
          />
          <CollapseItem
            name="title"
            title="Title"
          >
            折叠的内容。
          </CollapseItem>
          <CollapseItem
            name="expanded"
            title="Expanded"
          >
            Here is the description content. Here is the description content. Here is the description content.
          </CollapseItem>
        </Collapse>
        <Collapse
          v-model="collapseCaret"
          arrow="filled"
          bordered
          filled
        >
          <CollapseItem
            name="c-expanded"
            title="Expanded"
          >
            面性箭头在左侧，展开内容与标题对齐。
          </CollapseItem>
          <CollapseItem
            name="c-2"
            title="Title"
          >
            第二条。
          </CollapseItem>
        </Collapse>
        <Collapse
          v-model="collapseAcc"
          accordion
          bordered
        >
          <CollapseItem
            name="a1"
            title="手风琴 1"
          >
            只展开一项。
          </CollapseItem>
          <CollapseItem
            name="a2"
            title="手风琴 2"
          >
            打开这项时，上一项会收起。
          </CollapseItem>
        </Collapse>
      </div>
      <h2>面包屑</h2>
      <Breadcrumb
        :items="crumbs"
        @select="crumbLog = `第 ${$event + 1} 级`"
      />
      <div class="crumb-narrow">
        <Breadcrumb
          :items="longCrumbs"
          @select="crumbLog = `折叠后的第 ${$event + 1} 级`"
        />
      </div>
      <Breadcrumb
        :items="wideCrumbs"
        @select="crumbLog = `长文案第 ${$event + 1} 级`"
      />
      <p class="hint">
        {{ crumbLog }}
      </p>
      <h2>分页</h2>
      <Pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :total="1200"
        @update:page="pageLog = `第 ${$event} 页，每页 ${pageSize} 条`"
      />
      <p class="hint">
        {{ pageLog }}
      </p>
      <Pagination
        v-model:page="lonePage"
        :total="1"
      />
      <Pagination
        v-model:page="smallPage"
        size="sm"
        :total="500"
      />
      <h2>步骤条</h2>
      <div class="steps-demo">
        <Steps
          v-model="stepActive"
          clickable
          @update:model-value="stepLog = `第 ${Number($event) + 1} 步`"
        >
          <StepsItem
            title="填写信息"
            description="这是说明。"
          />
          <StepsItem
            title="确认内容"
            description="这是说明。"
          />
          <StepsItem
            title="提交审批"
            description="这是说明。"
          />
          <StepsItem
            title="完成"
            description="这是说明。"
          />
        </Steps>
        <p class="hint">
          {{ stepLog }}
        </p>
        <Steps :model-value="1">
          <StepsItem
            title="填写信息"
            description="这是说明。"
          />
          <StepsItem
            title="确认内容"
            description="这是说明。"
            status="error"
          />
          <StepsItem
            title="提交审批"
            description="这是说明。"
          />
          <StepsItem
            title="完成"
            description="这是说明。"
          />
        </Steps>
        <Steps
          variant="simple"
          :model-value="2"
        >
          <StepsItem
            title="1. 填写信息"
            description="这是说明。"
          />
          <StepsItem
            title="2. 确认内容"
            description="这是说明。"
          />
          <StepsItem
            title="3. 提交审批"
            description="这是说明。"
          />
          <StepsItem
            title="4. 完成"
            description="这是说明。"
          />
        </Steps>
        <div class="steps-split">
          <Steps
            direction="vertical"
            :model-value="1"
          >
            <StepsItem
              title="填写信息"
              description="这是说明。"
            />
            <StepsItem
              title="确认内容"
              description="这是说明。"
            />
            <StepsItem
              title="提交审批"
              description="这是说明。"
            />
            <StepsItem
              title="完成"
              description="这是说明。"
            />
          </Steps>
          <Steps
            direction="vertical"
            variant="simple"
            :model-value="1"
          >
            <StepsItem
              title="填写信息"
              description="这是说明。"
            />
            <StepsItem
              title="确认内容"
              description="这是说明。"
            />
            <StepsItem
              title="提交审批"
              description="这是说明。"
            />
            <StepsItem
              title="完成"
              description="这是说明。"
            />
          </Steps>
        </div>
      </div>
      <h2>临时提示</h2>
      <div class="toast-demo">
        <Toast
          content="This is a global prompt for a message"
          closable
          :actions="[{ text: 'Text_Button' }]"
        />
        <Toast
          content="Support newline display when text information is too long or multiple languages, and text display is the most 2 more lines, it is not easy to read if it is too long."
          closable
          :actions="[{ text: 'Text_Button' }, { text: 'Text_Button' }]"
        />
        <Toast content="The excess is represented by dots. In multi-language or special scenarios, multiple lines of display are required, and the copy can be folded, up to two lines. The rest is hidden behind an ellipsis that never shows." />
        <Toast
          type="success"
          content="保存成功"
        />
        <Toast
          type="error"
          content="网络异常，发送失败"
          closable
        />
        <Toast
          type="warning"
          content="文件较大，上传可能需要较长时间"
        />
        <Toast
          type="loading"
          content="正在加载"
        />
      </div>
      <div class="badges">
        <Button
          size="sm"
          @click="toast.info('这是一条普通提示')"
        >
          info
        </Button>
        <Button
          size="sm"
          @click="toast.success('保存成功')"
        >
          success
        </Button>
        <Button
          size="sm"
          @click="toast.error('发送失败', { closable: true })"
        >
          error
        </Button>
        <Button
          size="sm"
          @click="toast.warning('即将超出存储空间', { actions: [{ text: '去清理' }] })"
        >
          warning + 操作
        </Button>
        <Button
          size="sm"
          @click="showLoadingToast"
        >
          loading 3 秒后成功
        </Button>
      </div>
      <h2>常驻提示</h2>
      <div class="notice-demo">
        <Notice
          content="Info"
          closable
        />
        <Notice
          type="success"
          content="Success"
          closable
        />
        <Notice
          type="error"
          content="Error"
          closable
        />
        <Notice
          type="warning"
          content="Warning"
          closable
        />
        <Notice
          content="In single-line case, the text button and the close button are right-aligned"
          closable
          :actions="[{ text: 'Text_Button' }]"
        />
        <Notice
          title="Title"
          content="When there are multiple lines or titles, the text is left-aligned, and the title and text buttons are displayed on one line exclusively."
          closable
          :actions="[{ text: 'Text_Button' }]"
          style="--ud-notice-content-max-width: 580px"
        />
        <Notice
          content="操作按钮跟随文本"
          action-placement="follow"
          closable
          :actions="[{ text: 'Text_Button' }]"
        />
        <Notice
          align="center"
          content="居中时文字按钮跟随文本，关闭按钮始终右对齐"
          closable
          :actions="[{ text: 'Text_Button' }]"
        />
        <Notice
          type="error"
          :max-lines="2"
          style="width: 360px"
        >
          网络连接已断开，正在尝试重新连接。如果长时间无法恢复，请检查网络设置，或者<a href="#">查看帮助文档</a>了解更多排查方式。
        </Notice>
        <Notice
          v-model:open="noticeOpen"
          banner
          content="服务器将于今晚 23:00 进行维护"
          closable
        />
        <Button
          v-if="!noticeOpen"
          size="sm"
          @click="noticeOpen = true"
        >
          恢复通栏提示
        </Button>
      </div>
      <h2>对话框</h2>
      <div class="badges">
        <Button
          size="sm"
          @click="dialogs.basic = true"
        >
          基础
        </Button>
        <Button
          size="sm"
          @click="dialogs.custom = true"
        >
          自定义内容
        </Button>
        <Button
          size="sm"
          @click="dialogs.scroll = true"
        >
          内容滚动
        </Button>
        <Button
          size="sm"
          @click="dialogs.three = true"
        >
          三个按钮
        </Button>
        <Button
          size="sm"
          @click="dialogs.vertical = true"
        >
          按钮上下排
        </Button>
        <span class="dialog-log">{{ dialogLog }}</span>
      </div>
      <Dialog
        v-model:open="dialogs.basic"
        type="info"
        title="I am the title content"
        description="This is the title description information"
        :closable="false"
        ok-text="确定"
        @close="dialogLog = `basic: ${$event}`"
      />
      <Dialog
        v-model:open="dialogs.custom"
        size="md"
        title="I am the title content"
        cancel-text="Cancel"
        ok-text="Confirm"
        :before-ok="saveLater"
        @close="dialogLog = `custom: ${$event}`"
      >
        <div class="dialog-area">
          In gray is the popover content/action area
        </div>
        <Button
          size="sm"
          style="margin-top: 12px"
          @click="dialogs.nested = true"
        >
          再打开一层
        </Button>
      </Dialog>
      <Dialog
        v-model:open="dialogs.nested"
        title="二级对话框"
        description="每一个对话框底部都叠加一个蒙层"
        ok-text="知道了"
      />
      <Dialog
        v-model:open="dialogs.scroll"
        size="md"
        title="I am the title content"
        :max-height="480"
        cancel-text="cancel"
        ok-text="Sure."
      >
        <div
          v-for="file in files"
          :key="file"
          class="dialog-file"
        >
          <Avatar
            kind="app"
            :size="48"
            name="ZIP"
          />
          <div>
            <div>{{ file }}</div>
            <div class="dialog-file__size">
              548.6 KB
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        v-model:open="dialogs.three"
        type="warning"
        title="Send schedule deletion notifications to participants?"
        cancel-text="Don't Send"
        ok-text="Send"
        :closable="false"
      >
        <template #footer-extra>
          <Button @click="dialogs.three = false">
            Do not delete
          </Button>
        </template>
      </Dialog>
      <Dialog
        v-model:open="dialogs.vertical"
        type="success"
        title="I am the title content"
        footer-direction="vertical"
        ok-text="I am a super long boot operation"
        cancel-text="I am the second line of  secondary operations"
        :closable="false"
      />
      <h2>抽屉</h2>
      <div class="badges">
        <Button
          size="sm"
          @click="drawers.basic = true"
        >
          基础
        </Button>
        <Button
          size="sm"
          @click="drawers.rich = true"
        >
          标签和操作
        </Button>
        <Button
          size="sm"
          @click="drawers.avatar = true"
        >
          头像
        </Button>
        <Button
          size="sm"
          @click="drawers.tabs = true"
        >
          Tabs
        </Button>
        <Button
          size="sm"
          @click="drawers.modal = true"
        >
          模态
        </Button>
        <Button
          size="sm"
          @click="drawers.push = !drawers.push"
        >
          挤压型
        </Button>
        <span class="dialog-log">{{ drawerLog }}</span>
      </div>
      <div class="drawer-push-demo">
        <div class="drawer-push-demo__content">
          页面内容会被右侧抽屉挤压
        </div>
        <Drawer
          v-model:open="drawers.push"
          mode="push"
          title="评论"
          @close="drawerLog = `push: ${$event}`"
        >
          <p
            v-for="n in 6"
            :key="n"
            style="margin: 0 0 12px"
          >
            第 {{ n }} 条评论
          </p>
        </Drawer>
      </div>
      <Drawer
        v-model:open="drawers.basic"
        size="md"
        title="Side pull window title"
        description="Description text or auxiliary information"
        cancel-text="Secondary button"
        ok-text="Main button"
        @close="drawerLog = `basic: ${$event}`"
      >
        <div class="drawer-area" />
      </Drawer>
      <Drawer
        v-model:open="drawers.rich"
        size="md"
        title="Side pull window title"
        footer-align="left"
        ok-text="Main button"
        cancel-text="Secondary button"
        @close="drawerLog = `rich: ${$event}`"
      >
        <template #tag>
          <Tag
            size="sm"
            color="blue"
          >
            External
          </Tag>
        </template>
        <template #actions>
          <button
            type="button"
            class="drawer-icon-button"
            aria-label="分享"
          >
            <ParkIcon :icon="Share" />
          </button>
        </template>
        <template #footer-extra>
          <Button type="text">
            Clear
          </Button>
        </template>
        <p
          v-for="n in 40"
          :key="n"
          style="margin: 0 0 12px"
        >
          内容第 {{ n }} 行
        </p>
      </Drawer>
      <Drawer
        v-model:open="drawers.avatar"
        title="Side pull window title"
        description="Description text or auxiliary information"
        @close="drawerLog = `avatar: ${$event}`"
      >
        <template #prefix>
          <Avatar
            src="/avatar-sample.png"
            name="林七七"
            :size="40"
          />
        </template>
        没有操作区时，内容区四边间距一致。
      </Drawer>
      <Drawer
        v-model:open="drawers.tabs"
        size="md"
        title="Side pull window title"
        @close="drawerLog = `tabs: ${$event}`"
      >
        <template #tabs>
          <Tabs
            v-model="drawerTab"
            size="md"
          >
            <Tab value="t1">
              Tab 1
            </Tab>
            <Tab value="t2">
              Tab 2
            </Tab>
            <Tab value="t3">
              Tab 3
            </Tab>
          </Tabs>
        </template>
        当前：{{ drawerTab }}
      </Drawer>
      <Drawer
        v-model:open="drawers.modal"
        modal
        size="lg"
        title="模态抽屉"
        description="点击遮罩无效，只能通过关闭按钮或操作按钮关闭"
        cancel-text="取消"
        ok-text="保存"
        :before-ok="saveLater"
        @close="drawerLog = `modal: ${$event}`"
      >
        <Input placeholder="请输入" />
      </Drawer>
      <h2>通知</h2>
      <div class="notification-demo">
        <Notification
          title="Message"
          content="This is a message, this is a message, this is a message, this is a message, this is a message."
          :actions="[{ text: 'Secondary button' }, { text: 'Main button' }]"
        />
        <Notification
          type="success"
          title="Success"
          content="This is a message, this is a message, this is a message, this is a message, this is a message."
        />
        <Notification
          type="warning"
          title="Warning"
          content="This is a message, this is a message."
        />
        <Notification
          type="error"
          title="Error"
          content="This is a message, this is a message."
        />
        <Notification
          type="success"
          content="没有标题时，正文和图标在同一行"
        />
        <Notification
          :show-icon="false"
          color="orange"
          title="无图标"
          content="标签颜色可选蓝、绿、橙、红"
        />
        <Notification>
          <template #custom>
            <div class="notification-custom">
              The grey area is the content/action area
            </div>
          </template>
        </Notification>
      </div>
      <div class="badges">
        <Button
          size="sm"
          @click="notification.info('有新的审批待处理', { title: '审批提醒' })"
        >
          info
        </Button>
        <Button
          size="sm"
          @click="notification.success('文件已同步到云空间', { title: '同步完成' })"
        >
          success
        </Button>
        <Button
          size="sm"
          @click="notification.error('请尽快处理线上告警', {
            title: '紧急告警',
            actions: [{ text: '稍后' }, { text: '立即处理' }],
          })"
        >
          error + 操作
        </Button>
      </div>
      <h2>进度条</h2>
      <div class="progress-demo">
        <Progress :percent="0" />
        <Progress :percent="progressValue" />
        <Progress
          :percent="100"
          status="success"
        />
        <Progress
          :percent="50"
          status="error"
        />
        <Progress indeterminate />
      </div>
      <div class="badges">
        <Progress
          variant="circle"
          :percent="0"
        />
        <Progress
          variant="circle"
          :percent="progressValue"
        />
        <Progress
          variant="circle"
          :percent="75"
          info-placement="right"
        />
        <Progress
          variant="circle"
          status="success"
        />
        <Progress
          variant="circle"
          status="error"
        />
        <Progress
          variant="circle"
          indeterminate
        />
        <Button
          size="sm"
          @click="progressValue = (progressValue + 15) % 115"
        >
          前进 15%
        </Button>
      </div>
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

.panel > h2 {
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

.switches {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.tabs-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 16px;
}

.badges {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 16px;
}

.toast-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.notice-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 688px;
  margin-bottom: 16px;
}

.dialog-log {
  color: var(--ud-color-text-placeholder);
  font-size: 12px;
}

.dialog-area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 138px;
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-bg-1);
  color: var(--ud-color-text-secondary);
}

.dialog-file {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}

.dialog-file__size {
  color: var(--ud-color-text-placeholder);
  font-size: 12px;
  line-height: 20px;
}

.drawer-push-demo {
  display: flex;
  height: 240px;
  margin-bottom: 16px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-s);
  overflow: hidden;
}

.drawer-push-demo__content {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  min-width: 0;
  color: var(--ud-color-text-placeholder);
}

.drawer-area {
  height: 685px;
  border-radius: var(--ud-radius-xs);
  background: var(--ud-color-bg-2);
}

.drawer-icon-button {
  display: inline-flex;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
}

.notification-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.notification-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 108px;
  background: var(--ud-color-bg-2);
  color: var(--ud-color-text-placeholder);
  text-align: center;
}

.progress-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 440px;
  margin-bottom: 24px;
}

.spin-dark,
.spin-grey {
  display: inline-flex;
  padding: 16px;
  background: var(--ud-color-brand);
}

.spin-grey {
  background: var(--ud-color-bg-1);
}

.spin-module {
  width: 240px;
  border: 1px solid var(--ud-color-border-card);
  border-radius: var(--ud-radius-m);
}

.spin-module__body {
  padding: 16px;
}

.spin-module__body p {
  margin: 0 0 8px;
}

.skeleton-demo {
  padding: 16px;
  background: var(--ud-color-bg-3);
}

.badge-icon {
  display: inline-flex;
  font-size: 24px;
  color: var(--ud-color-icon);
}

.badge-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--ud-color-brand);
  color: var(--ud-color-bg-white);
  font-size: 16px;
}

.ud-tag.tag-narrow {
  max-width: 120px;
}

.ud-radio.radio-narrow {
  max-width: 160px;
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

.panel > .ud-breadcrumb,
.crumb-narrow {
  margin-bottom: 12px;
}

.crumb-narrow {
  width: 280px;
}

.steps-demo {
  display: grid;
  gap: 28px;
}

.steps-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 720px;
}

.collapse-demo {
  display: grid;
  gap: 24px;
  max-width: 560px;
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
