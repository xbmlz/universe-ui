<script setup lang="ts">
import type { UploadFile, UploadHandlers, UploadListType, UploadSize } from './types'
import { Close, FileExcel, FileJpg, FileMusic, FilePdf, FilePpt, FileText, FileWord, FileZip } from '@icon-park/vue-next'
import { computed, onBeforeUnmount, shallowRef, useTemplateRef } from 'vue'
import ParkIcon from '../../internal/park-icon.vue'
import { ImageViewer } from '../imageviewer'
import { formatSize, matchesAccept } from './format'

/*
 * Specified in upload.md: the trigger is a button or a drop area, the helper text
 * explains the accepted format and size, files are validated before upload, the
 * button disables once the maximum count is reached, files that exceed the size or
 * count are rejected, and the list offers a retry and a remove action. File row
 * sizes are inferred from the 40px / 60px attachment callouts.
 */
const {
  accept = '',
  multiple = true,
  maxCount,
  maxSize,
  listType = 'text',
  size = 'normal',
  action,
  headers,
  withCredentials = false,
  disabled = false,
  autoUpload = true,
  customRequest,
  responseUrl,
  drag = true,
  actionsOnHover = false,
  previewable = false,
  showFileIcon = false,
  tip,
  fieldName = 'file',
  placeholder = '点击或拖拽文件到这里上传',
  buttonText = '选择文件',
  label,
  emptyText = '还没有文件',
} = defineProps<{
  accept?: string
  multiple?: boolean
  maxCount?: number
  maxSize?: number
  listType?: UploadListType
  size?: UploadSize
  action?: string
  headers?: Record<string, string>
  withCredentials?: boolean
  disabled?: boolean
  autoUpload?: boolean
  customRequest?: (file: File, handlers: UploadHandlers) => void
  /** Map a successful XHR response body to a preview URL. */
  responseUrl?: (response: string) => string | undefined | null
  /** `true` always shows the drop area; `hidden` reveals it only while files are dragged over. */
  drag?: boolean | 'hidden'
  /** Hide row actions until the row is hovered or focused. */
  actionsOnHover?: boolean
  /** Open the built-in ImageViewer for picture attachments. */
  previewable?: boolean
  /** Show an IconPark file-type glyph before the name. */
  showFileIcon?: boolean
  tip?: string
  fieldName?: string
  placeholder?: string
  buttonText?: string
  label?: string
  emptyText?: string
}>()

const emit = defineEmits<{ preview: [file: UploadFile] }>()

const files = defineModel<UploadFile[]>({
  default: () => [],
})

const inputRef = useTemplateRef<HTMLInputElement>('input')
const rootRef = useTemplateRef<HTMLElement>('root')
const dragging = shallowRef(false)
const viewerOpen = shallowRef(false)
const viewerIndex = shallowRef(0)
let seed = 0

const FILE_ICONS = {
  'pdf': FilePdf,
  'doc': FileWord,
  'docx': FileWord,
  'xls': FileExcel,
  'xlsx': FileExcel,
  'csv': FileExcel,
  'ppt': FilePpt,
  'pptx': FilePpt,
  'zip': FileZip,
  'rar': FileZip,
  '7z': FileZip,
  'jpg': FileJpg,
  'jpeg': FileJpg,
  'png': FileJpg,
  'gif': FileJpg,
  'webp': FileJpg,
  'svg': FileJpg,
  'mp3': FileMusic,
  'wav': FileMusic,
  'flac': FileMusic,
  'txt': FileText,
  'md': FileText,
  'json': FileText,
} as const

function iconFor(name: string) {
  const extension = name.split('.').pop()?.toLowerCase() ?? ''
  return FILE_ICONS[extension as keyof typeof FILE_ICONS] ?? FileText
}

const pictureFiles = computed(() => files.value
  .filter(file => !!file.url)
  .map(file => ({ src: file.url!, alt: file.name })))

const canPreviewImage = computed(() => previewable && pictureFiles.value.length > 0)

const full = computed(() => maxCount != null && files.value.length >= maxCount)
const canSelect = computed(() => !disabled && !full.value)

function patch(uid: string, changes: Partial<UploadFile>) {
  files.value = files.value.map(file => (file.uid === uid
    ? {
        ...file,
        ...changes,
      }
    : file))
}

function upload(file: UploadFile) {
  const raw = file.raw
  if (!raw)
    return
  patch(file.uid, {
    status: 'uploading',
    percent: 0,
    error: undefined,
  })
  const handlers: UploadHandlers = {
    onProgress: percent => patch(file.uid, { percent }),
    onSuccess: url => patch(file.uid, {
      status: 'success',
      percent: 100,
      url,
    }),
    onError: message => patch(file.uid, {
      status: 'error',
      error: message,
    }),
  }
  if (customRequest) {
    customRequest(raw, handlers)
    return
  }
  if (!action) {
    handlers.onSuccess()
    return
  }
  const form = new FormData()
  form.append(fieldName, raw, raw.name)
  const request = new XMLHttpRequest()
  request.open('POST', action)
  if (withCredentials)
    request.withCredentials = true
  for (const [key, value] of Object.entries(headers ?? {}))
    request.setRequestHeader(key, value)
  request.upload.onprogress = (event) => {
    if (event.lengthComputable)
      handlers.onProgress(Math.round(event.loaded / event.total * 100))
  }
  request.onload = () => {
    if (request.status >= 200 && request.status < 300)
      handlers.onSuccess(responseUrl?.(request.responseText))
    else
      handlers.onError(`上传失败（${request.status}）`)
  }
  request.onerror = () => handlers.onError('网络错误')
  request.send(form)
}

function addFiles(list: File[]) {
  if (disabled)
    return
  const room = maxCount != null
    ? Math.max(0, maxCount - files.value.length)
    : list.length
  const next = [...files.value]
  const queued: UploadFile[] = []
  for (const raw of list) {
    if (queued.length >= room)
      break
    if (!matchesAccept(raw, accept))
      continue
    const entry: UploadFile = {
      uid: `upload-${++seed}`,
      name: raw.name,
      size: raw.size,
      status: 'ready',
      percent: 0,
      url: listType === 'picture'
        ? URL.createObjectURL(raw)
        : undefined,
      raw,
    }
    if (maxSize != null && raw.size > maxSize) {
      next.push({
        ...entry,
        status: 'error',
        error: `文件大于 ${formatSize(maxSize)}`,
      })
      continue
    }
    next.push(entry)
    queued.push(entry)
  }
  files.value = next
  if (autoUpload)
    queued.forEach(upload)
}

function pick() {
  if (!canSelect.value)
    return
  inputRef.value?.click()
}

function onChange(event: Event) {
  const field = event.target
  if (!(field instanceof HTMLInputElement))
    return
  const chosen = field.files
    ? [...field.files]
    : []
  addFiles(chosen)
  field.value = ''
}

function onDragOver(event: DragEvent) {
  if (!canSelect.value)
    return
  if (event.dataTransfer?.types.includes('Files'))
    dragging.value = true
}

function onRootDragOver(event: DragEvent) {
  if (drag !== 'hidden')
    return
  onDragOver(event)
}

function onRootDragLeave(event: DragEvent) {
  if (drag !== 'hidden')
    return
  const related = event.relatedTarget
  if (related instanceof Node && rootRef.value?.contains(related))
    return
  dragging.value = false
}

function onDragLeave() {
  dragging.value = false
}

function onDrop(event: DragEvent) {
  dragging.value = false
  if (!canSelect.value)
    return
  const dropped = event.dataTransfer?.files
    ? [...event.dataTransfer.files]
    : []
  addFiles(dropped)
}

function onRootDrop(event: DragEvent) {
  if (drag === 'hidden')
    onDrop(event)
}

function preview(file: UploadFile) {
  emit('preview', file)
  if (!canPreviewImage.value)
    return
  const index = files.value.findIndex(item => item.uid === file.uid)
  if (index < 0 || !files.value[index]?.url)
    return
  viewerIndex.value = pictureFiles.value.findIndex(item => item.src === files.value[index]!.url)
  if (viewerIndex.value < 0)
    return
  viewerOpen.value = true
}

function remove(uid: string) {
  const target = files.value.find(file => file.uid === uid)
  if (target?.url)
    URL.revokeObjectURL(target.url)
  files.value = files.value.filter(file => file.uid !== uid)
}

function retry(uid: string) {
  const target = files.value.find(file => file.uid === uid)
  if (target)
    upload(target)
}

onBeforeUnmount(() => {
  files.value.forEach((file) => {
    if (file.url)
      URL.revokeObjectURL(file.url)
  })
})
</script>

<template>
  <div
    ref="root"
    class="ud-upload"
    :class="{
      'ud-upload--disabled': disabled,
      'ud-upload--full': full,
      'ud-upload--small': size === 'small',
      'ud-upload--actions-hover': actionsOnHover,
    }"
    @dragover.prevent="onRootDragOver"
    @dragleave="onRootDragLeave"
    @drop.prevent="onRootDrop"
  >
    <label
      v-if="label"
      class="ud-input__label"
    >{{ label }}</label>
    <div
      v-if="drag && (drag !== 'hidden' || dragging)"
      class="ud-upload__drop"
      :class="{ 'is-dragging': dragging, 'is-disabled': !canSelect }"
      role="button"
      :tabindex="canSelect ? 0 : -1"
      @click="pick"
      @keydown.enter.prevent="pick"
      @keydown.space.prevent="pick"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <span class="ud-upload__drop-text">{{ full ? '已达上传数量上限' : placeholder }}</span>
      <span
        v-if="tip"
        class="ud-upload__drop-hint"
      >{{ tip }}</span>
    </div>
    <button
      v-else
      type="button"
      class="ud-upload__button"
      :disabled="!canSelect"
      @click="pick"
    >
      {{ buttonText }}
    </button>
    <input
      ref="input"
      type="file"
      class="ud-upload__input"
      :accept="accept || undefined"
      :multiple="multiple"
      :disabled="!canSelect"
      @change="onChange"
    >
    <p
      v-if="tip && !drag"
      class="ud-upload__tip"
    >
      {{ tip }}
    </p>
    <div
      v-if="files.length"
      class="ud-upload__list"
      :class="`ud-upload__list--${listType}`"
    >
      <div
        v-for="file in files"
        :key="file.uid"
        class="ud-upload__file"
        :class="`is-${file.status}`"
        role="group"
        tabindex="0"
        @click="preview(file)"
        @keydown.enter="preview(file)"
      >
        <span
          v-if="showFileIcon && listType !== 'picture'"
          class="ud-upload__file-icon"
        >
          <slot
            name="file-icon"
            :file="file"
          >
            <ParkIcon :icon="iconFor(file.name)" />
          </slot>
        </span>
        <template v-if="listType === 'picture'">
          <img
            v-if="file.url"
            class="ud-upload__thumb"
            :src="file.url"
            :alt="file.name"
          >
          <span
            v-else
            class="ud-upload__thumb ud-upload__thumb--empty"
          />
        </template>
        <span class="ud-upload__info">
          <span
            class="ud-upload__name"
            :title="file.name"
          >{{ file.name }}</span>
          <span class="ud-upload__meta">
            <span>{{ formatSize(file.size) }}</span>
            <span
              v-if="file.status === 'error'"
              class="ud-upload__error"
            >{{ file.error }}</span>
            <span
              v-else-if="file.status === 'uploading'"
              class="ud-upload__percent"
            >{{ file.percent }}%</span>
          </span>
          <span
            v-if="file.status === 'uploading'"
            class="ud-upload__progress"
          >
            <span
              class="ud-upload__progress-fill"
              :style="{ width: `${file.percent}%` }"
            />
          </span>
        </span>
        <button
          v-if="file.status === 'error'"
          type="button"
          class="ud-upload__retry"
          @click.stop="retry(file.uid)"
        >
          重试
        </button>
        <button
          type="button"
          class="ud-upload__remove"
          :aria-label="`删除${file.name}`"
          @click.stop="remove(file.uid)"
        >
          <ParkIcon :icon="Close" />
        </button>
      </div>
    </div>
    <p
      v-else-if="!drag"
      class="ud-upload__empty"
    >
      {{ emptyText }}
    </p>
    <ImageViewer
      v-if="canPreviewImage"
      v-model="viewerOpen"
      v-model:index="viewerIndex"
      :images="pictureFiles"
      label="附件图片预览"
    />
  </div>
</template>
