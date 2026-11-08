<script setup lang="ts">
import { Share } from '@icon-park/vue-next'
import { Avatar, Button, Dialog, Drawer, Input, Notice, Notification, notification, Progress, Tab, Tabs, Tag, Toast, toast } from '@universe-ui/vue'
import ParkIcon from '../../../packages/vue/src/internal/park-icon.vue'
import { useDemo } from '../demo'

const {
  progressValue,
  noticeOpen,
  dialogs,
  dialogLog,
  drawers,
  drawerTab,
  drawerLog,
  files,
  saveLater,
  showLoadingToast,
} = useDemo()
</script>

<template>
  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>

  <section class="panel">
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
  </section>
</template>
