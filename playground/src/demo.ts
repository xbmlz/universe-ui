import type { AnchorItem, ButtonType, CascaderOption, InputAddonOption, NavMenuItem, SelectOption, TransferItem, TreeOption, UploadFile } from '@universe-ui/vue'
import { toast } from '@universe-ui/vue'
import { computed, reactive, shallowRef } from 'vue'

/**
 * Demo state for the playground. Every section calls this once, so each panel owns
 * its own copy and a broken panel cannot take the rest of the page down.
 */
export function useDemo() {
  const types: { type: ButtonType, label: string }[] = [
    { type: 'primary', label: '主要' },
    { type: 'danger', label: '主要危险' },
    { type: 'success', label: '成功' },
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
  const stepperCount = shallowRef<number | null>(3)
  const rateScore = shallowRef(3)
  const rateTexts = ['很差', '较差', '一般', '较好', '很好']
  const volume = shallowRef(40)
  const priceRange = shallowRef<[number, number]>([20, 80])
  const sliderMarks: Record<number, string> = {
    0: '0',
    25: '25',
    50: '50',
    75: '75',
    100: '100',
  }
  const regions: CascaderOption[] = [
    {
      value: 'east',
      label: '华东',
      children: [
        {
          value: 'shanghai',
          label: '上海',
          children: [
            { value: 'pudong', label: '浦东' },
            { value: 'xuhui', label: '徐汇' },
          ],
        },
        { value: 'hangzhou', label: '杭州' },
      ],
    },
    {
      value: 'south',
      label: '华南',
      children: [
        { value: 'shenzhen', label: '深圳' },
        { value: 'guangzhou', label: '广州' },
      ],
    },
    { value: 'west', label: '西部', disabled: true },
  ]
  const departments: TreeOption[] = [
    {
      value: 'product',
      label: '产品部门',
      children: [
        {
          value: 'design',
          label: '设计',
          children: [
            { value: 'ui', label: '界面' },
            { value: 'ux', label: '体验' },
          ],
        },
        { value: 'dev', label: '研发' },
      ],
    },
    { value: 'ops', label: '运营' },
    { value: 'hr', label: '人事', disabled: true },
  ]
  const channels: TransferItem[] = [
    { key: 'mail', label: '邮件' },
    { key: 'sms', label: '短信', description: '每天最多一条' },
    { key: 'im', label: '站内信' },
    { key: 'push', label: '应用推送', disabled: true },
  ]
  const themeSwatches = [
    '#f54a45',
    '#ff8800',
    '#ffc60c',
    '#34c724',
    '#00d6b9',
    '#3270ff',
    '#12c0ff',
    '#4a54e6',
    '#7f3bf5',
    '#f01e94',
    '#8f959e',
  ]
  const fullColorSwatches = [
    '#ffffff',
    '#3270ff',
    '#34c724',
    '#7f3bf5',
    '#ffc60c',
    '#f54a45',
    '#f2f3f5',
    '#f0f4ff',
    '#f0fbef',
    '#f7f1fe',
    '#fdf9ed',
    '#fef1f1',
    '#eff0f1',
    '#e1eaff',
    '#d9f5d6',
    '#ece2fe',
    '#faf1d1',
    '#fde2e2',
    '#dee0e3',
    '#bacefd',
    '#b7edb1',
    '#cdb2fa',
    '#f8e6ab',
    '#fbbfbc',
    '#bbbfc4',
    '#82a7fc',
    '#8de084',
    '#ad82f7',
    '#f7dc82',
    '#f98e8b',
    '#8f959e',
    '#4e83fd',
    '#62d256',
    '#945af6',
    '#fad356',
    '#f76964',
  ]
  const region = shallowRef<string | null>(null)
  const regionMany = shallowRef<string[]>(['shanghai'])
  const department = shallowRef<string | null>(null)
  const departmentMany = shallowRef<string[]>(['ui', 'dev'])
  const channel = shallowRef<string[]>(['mail'])
  const themeColor = shallowRef('#1456f0')
  const uploadFiles = shallowRef<UploadFile[]>([])
  const viewerOpen = shallowRef(false)
  const viewerIndex = shallowRef(0)
  const viewerImages = [
    'https://picsum.photos/seed/universe-1/1200/800',
    'https://picsum.photos/seed/universe-2/800/1200',
    'https://picsum.photos/seed/universe-3/1600/900',
  ]
  const navKey = shallowRef('home')
  const navItems: NavMenuItem[] = [
    { key: 'home', label: '首页' },
    {
      key: 'docs',
      label: '文档',
      children: [
        { key: 'guide', label: '指南' },
        { key: 'api', label: 'API' },
      ],
    },
    { key: 'components', label: '组件', badge: 5 },
    { key: 'pricing', label: '价格' },
    { key: 'about', label: '关于' },
  ]
  const anchorItems: AnchorItem[] = [
    {
      key: 'anchor-basic',
      label: '基础',
      children: [
        { key: 'anchor-child-1', label: '子条目一' },
        { key: 'anchor-child-2', label: '子条目二' },
      ],
    },
    { key: 'anchor-second', label: '第二个模块' },
    { key: 'anchor-third', label: '第三个模块' },
    { key: 'anchor-fourth', label: '第四个模块' },
  ]

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

  return {
    types,
    blues,
    typeScale,
    neutrals,
    radii,
    shadows,
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
    specOptions,
    specSizes,
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
    tagSizes,
    labels,
    lineSizes,
    lineTab,
    capsuleTab,
    unread,
    masked,
    progressValue,
    noticeOpen,
    dialogs,
    dialogLog,
    drawers,
    drawerTab,
    drawerLog,
    files,
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
    viewerOpen,
    viewerIndex,
    viewerImages,
    navKey,
    navItems,
    anchorItems,
    saveLater,
    showLoadingToast,
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
    removeLabel,
    setMeetingAll,
  }
}
