<script setup lang="ts">
import { Remind, Share, SmilingFace } from '@icon-park/vue-next'
import { Anchor, Badge, Breadcrumb, Button, Card, Collapse, CollapseItem, Dropdown, DropdownItem, Empty, ImageViewer, NavigationMenu, Pagination, Placeholder, Popover, ScrollBar, Skeleton, Spin, Steps, StepsItem, Tab, Tabs, Tag, Timeline, TimelineItem } from '@universe-ui/vue'
import ParkIcon from '../../../packages/vue/src/internal/park-icon.vue'
import { useDemo } from '../demo'

const {
  tagSizes,
  labels,
  lineSizes,
  lineTab,
  capsuleTab,
  unread,
  masked,
  delayed,
  popoverClick,
  popoverLoading,
  popoverLog,
  dropdownClick,
  dropdownLoading,
  dropdownLog,
  collapseLine,
  collapseCaret,
  collapseAcc,
  crumbLog,
  stepActive,
  stepLog,
  page,
  pageSize,
  pageLog,
  lonePage,
  smallPage,
  crumbs,
  longCrumbs,
  wideCrumbs,
  people,
  avatarColors,
  viewerOpen,
  viewerIndex,
  viewerImages,
  navKey,
  navItems,
  anchorItems,
  removeLabel,
} = useDemo()
</script>

<template>
  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
    <h2>空状态</h2>
    <div class="badges">
      <Empty
        title="暂无内容"
        description="这里还没有任何内容，创建后可在此查看。"
        image-size="lg"
      >
        <template #actions>
          <Button type="secondary">
            了解详情
          </Button>
          <Button type="primary">
            新建
          </Button>
        </template>
      </Empty>
      <Empty
        title="没有搜索结果"
        description="换个关键词再试试。"
        image-size="sm"
      />
      <Empty
        title="加载失败"
        description="请检查网络后重试。"
      />
      <Empty description="只给描述时，标题可以省略。" />
    </div>
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
    <h2>卡片</h2>
    <div class="cards">
      <Card
        class="card-demo"
        title="带描边的卡片"
        subtitle="Border N300"
      >
        <p>
          卡片用来聚合同维度的信息。
        </p>
        <template #actions>
          <Button size="sm">
            查看
          </Button>
        </template>
      </Card>
      <Card
        class="card-demo"
        title="带投影的卡片"
        shadow="s1"
      >
        <p>
          投影让卡片与页面之间产生空间层级。
        </p>
      </Card>
      <Card
        class="card-demo"
        title="无描边卡片"
        :border="false"
        shadow="s2"
      >
        <p>
          无描边时用投影区分层级。
        </p>
      </Card>
      <Card
        class="card-demo"
        title="可点击卡片"
        hoverable
        clickable
      >
        <p>
          悬停时投影加重，按下时描边变品牌色。
        </p>
      </Card>
    </div>
  </section>

  <section class="panel">
    <h2>时间轴</h2>
    <div class="timelines">
      <Timeline>
        <TimelineItem
          title="订单已提交"
          time="2026-11-08 09:00"
          status="finish"
        >
          订单编号 1024。
        </TimelineItem>
        <TimelineItem
          title="商品出库"
          time="2026-11-08 11:30"
          status="process"
        >
          仓库已打包。
        </TimelineItem>
        <TimelineItem
          title="运输中"
          time="预计 2026-11-09"
        >
          承运方顺丰。
        </TimelineItem>
        <TimelineItem title="已签收">
          等待收货。
        </TimelineItem>
      </Timeline>
      <Timeline
        direction="alternate"
        spacing="loose"
      >
        <TimelineItem
          title="创建"
          time="09:00"
          status="success"
        >
          任务创建成功。
        </TimelineItem>
        <TimelineItem
          title="校验"
          time="09:10"
          status="warning"
        >
          有一个字段需要确认。
        </TimelineItem>
        <TimelineItem
          title="失败"
          time="09:20"
          status="error"
        >
          校验未通过。
        </TimelineItem>
        <TimelineItem
          title="加载中"
          time="09:30"
          status="loading"
        />
      </Timeline>
    </div>
  </section>

  <section class="panel">
    <h2>图片预览</h2>
    <div class="row">
      <Button
        type="secondary"
        @click="viewerOpen = true"
      >
        打开预览
      </Button>
      <span class="hint">支持前后翻页、缩放、旋转和下载，方向键与 Esc 可用。</span>
    </div>
    <ImageViewer
      v-model="viewerOpen"
      v-model:index="viewerIndex"
      :images="viewerImages"
    />
  </section>

  <section class="panel">
    <h2>滚动条</h2>
    <div class="scrollbars">
      <ScrollBar class="scrollbar-demo">
        <div class="scrollbar-content">
          <p
            v-for="line in 20"
            :key="line"
          >
            第 {{ line }} 行内容
          </p>
        </div>
      </ScrollBar>
      <ScrollBar
        class="scrollbar-demo scrollbar-demo--horizontal"
        axis="horizontal"
      >
        <div class="scrollbar-wide">
          <p
            v-for="line in 6"
            :key="line"
          >
            {{ '横向内容 '.repeat(8) }}
          </p>
        </div>
      </ScrollBar>
    </div>
  </section>

  <section class="panel">
    <h2>锚点</h2>
    <div class="anchor-demo">
      <Anchor :items="anchorItems" />
      <div class="anchor-demo__content">
        <div
          id="anchor-basic"
          class="anchor-block"
        >
          基础
          <div
            id="anchor-child-1"
            class="anchor-block anchor-block--sub"
          >
            子条目一
          </div>
          <div
            id="anchor-child-2"
            class="anchor-block anchor-block--sub"
          >
            子条目二
          </div>
        </div>
        <div
          id="anchor-second"
          class="anchor-block"
        >
          第二个模块
        </div>
        <div
          id="anchor-third"
          class="anchor-block"
        >
          第三个模块
        </div>
        <div
          id="anchor-fourth"
          class="anchor-block"
        >
          第四个模块
        </div>
      </div>
    </div>
  </section>

  <section class="panel">
    <h2>导航菜单</h2>
    <NavigationMenu
      v-model="navKey"
      :items="navItems"
    >
      <template #brand>
        <span class="nav-brand">universe</span>
      </template>
      <template #actions>
        <span class="hint">当前：{{ navKey }}</span>
      </template>
    </NavigationMenu>
  </section>
</template>
