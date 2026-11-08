<script setup lang="ts">
import { Info, Search } from '@icon-park/vue-next'
import { Cascader, Checkbox, CheckboxGroup, ColorPicker, Input, InputAddon, InputArea, InputChars, InputGroup, InputNumber, Radio, RadioGroup, Rate, Select, Slider, Stepper, Switch, Transfer, TreeSelect, Upload } from '@universe-ui/vue'
import ParkIcon from '../../../packages/vue/src/internal/park-icon.vue'
import { useDemo } from '../demo'

const {
  personName,
  note,
  keyword,
  days,
  fixedDays,
  rangeStart,
  rangeEnd,
  rangeDays,
  otp,
  otpSecret,
  essay,
  review,
  overflowText,
  shortNote,
  cities,
  countries,
  city,
  found,
  picked,
  packed,
  site,
  ratio,
  amount,
  unitOptions,
  unit,
  lengthUnits,
  lengthUnit,
  lengthValue,
  groupModes,
  groupMode,
  groupText,
  wrappedOptions,
  meetingOptions,
  meeting,
  meetingAll,
  meetingSome,
  rowOptions,
  agreed,
  leaveUnit,
  priceMode,
  buttonChoice,
  notify,
  compact,
  stepperCount,
  rateScore,
  rateTexts,
  volume,
  priceRange,
  sliderMarks,
  regions,
  region,
  regionMany,
  departments,
  department,
  departmentMany,
  channels,
  channel,
  themeSwatches,
  fullColorSwatches,
  themeColor,
  uploadFiles,
  setMeetingAll,
} = useDemo()
</script>

<template>
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
    <h2>步进器</h2>
    <div class="steppers">
      <Stepper
        v-model="stepperCount"
        label="数量"
      />
      <Stepper
        v-model="stepperCount"
        size="sm"
        width="120"
      />
      <Stepper
        v-model="stepperCount"
        size="lg"
      />
      <Stepper
        :model-value="8"
        :min="0"
        :max="8"
        label="已达上限"
      />
      <Stepper
        :model-value="0"
        :min="0"
        :max="999"
        label="已达下限"
      />
      <Stepper
        model-value="5"
        disabled
        label="禁用"
      />
      <Stepper
        model-value="5"
        error
        label="错误"
        message="超出范围"
      />
      <Stepper
        model-value="1"
        :min="1"
        :max="999"
        width="200"
        label="打印份数"
      />
    </div>
  </section>

  <section class="panel">
    <h2>评分</h2>
    <div class="rates">
      <Rate
        v-model="rateScore"
        show-text
        :texts="rateTexts"
      />
      <Rate
        :model-value="2.5"
        allow-half
        show-text
        :texts="rateTexts"
      />
      <Rate
        :model-value="4.2"
        readonly
        show-text
        :texts="rateTexts"
      />
      <Rate
        :model-value="3"
        disabled
      />
      <Rate
        :model-value="3"
        :clearable="false"
      />
    </div>
  </section>

  <section class="panel">
    <h2>滑动输入条</h2>
    <div class="sliders">
      <Slider
        v-model="volume"
        label="音量"
      />
      <Slider
        v-model="priceRange"
        label="价格区间"
        :marks="sliderMarks"
      />
      <Slider
        :model-value="30"
        disabled
        label="禁用"
      />
      <Slider
        :model-value="30"
        vertical
        label="竖向"
      />
    </div>
  </section>

  <section class="panel">
    <h2>级联选择</h2>
    <div class="inputs inputs--select">
      <Cascader
        v-model="region"
        :options="regions"
        label="单选"
      />
      <Cascader
        v-model="region"
        :options="regions"
        show-path
        clearable
        label="全路径回显"
      />
      <Cascader
        v-model="regionMany"
        :options="regions"
        multiple
        show-path
        label="多选"
      />
      <Cascader
        v-model="region"
        :options="regions"
        change-on-select
        label="任意级可选"
      />
      <Cascader
        v-model="region"
        :options="regions"
        disabled
        label="禁用"
      />
    </div>
  </section>

  <section class="panel">
    <h2>树选择</h2>
    <div class="inputs inputs--select">
      <TreeSelect
        v-model="department"
        :options="departments"
        label="单选"
      />
      <TreeSelect
        v-model="departmentMany"
        :options="departments"
        multiple
        label="多选"
      />
      <TreeSelect
        v-model="departmentMany"
        :options="departments"
        multiple
        checkable
        label="勾选型"
      />
      <TreeSelect
        v-model="departmentMany"
        :options="departments"
        multiple
        checkable
        searchable
        label="可搜索"
      />
      <TreeSelect
        v-model="department"
        :options="departments"
        disabled
        label="禁用"
      />
    </div>
  </section>

  <section class="panel">
    <h2>穿梭框</h2>
    <div class="transfers">
      <Transfer
        v-model="channel"
        :data="channels"
        label="通知方式"
      />
      <Transfer
        v-model="channel"
        :data="channels"
        :titles="['可选通知', '已选通知']"
        searchable
        :height="240"
      />
    </div>
  </section>

  <section class="panel">
    <h2>颜色选择器</h2>
    <div class="color-pickers">
      <ColorPicker
        v-model="themeColor"
        label="限量色板"
        :swatches="themeSwatches"
        :columns="6"
        :allow-custom="false"
        allow-no-color
      />
      <ColorPicker
        v-model="themeColor"
        label="全量选择"
        :swatches="fullColorSwatches"
        :columns="6"
      />
      <ColorPicker
        v-model="themeColor"
        size="sm"
        :swatches="themeSwatches"
        :columns="6"
        :allow-custom="false"
        allow-no-color
      />
      <ColorPicker
        model-value="#1456f0"
        disabled
        label="禁用"
      />
    </div>
  </section>

  <section class="panel">
    <h2>上传</h2>
    <div class="uploads">
      <Upload
        v-model="uploadFiles"
        label="附件"
        tip="支持 PDF、PNG、JPG，单个文件不超过 5MB"
        accept=".pdf,.png,.jpg,.zip"
        :max-size="5 * 1024 * 1024"
        :max-count="4"
      />
      <Upload
        v-model="uploadFiles"
        list-type="picture"
        accept="image/*"
        label="图片墙"
        tip="仅支持图片，最多 6 张"
        :max-count="6"
      />
      <Upload
        v-model="uploadFiles"
        drag="false"
        label="按钮触发"
        button-text="选择文件"
      />
    </div>
  </section>
</template>
