import { beforeEach, describe, expect, it, vi } from 'vitest'
import { add, config, defaultDuration, entries, remove, update } from './store'

beforeEach(() => {
  entries.splice(0, entries.length)
  config.value = { max: 2, top: 32 }
})

describe('defaultDuration', () => {
  it('keeps a loading toast open until it is updated', () => {
    expect(defaultDuration({ type: 'loading', content: 'x' })).toBe(0)
  })

  it('scales the duration with the text length', () => {
    expect(defaultDuration({ content: '保存成功' })).toBe(4000)
    expect(defaultDuration({
      content: 'x'.repeat(80),
    })).toBe(7000)
    expect(defaultDuration({
      content: 'x'.repeat(120),
    })).toBe(7000)
  })

  it('keeps at least 6s when the toast carries actions', () => {
    expect(defaultDuration({
      content: '保存成功',
      actions: [
        { text: 'undo' },
      ],
    })).toBe(6000)
    expect(defaultDuration({
      content: 'x'.repeat(80),
      actions: [
        { text: 'undo' },
      ],
    })).toBe(8000)
  })
})

describe('add', () => {
  it('appends a toast and returns its id', () => {
    const id = add({ content: '保存成功' })
    expect(entries).toHaveLength(1)
    expect(entries[0]!.id).toBe(id)
    expect(entries[0]!.type).toBe('info')
  })

  it('shows a close button for long text unless the caller decides otherwise', () => {
    config.value.max = 10
    add({ content: '这是一条刚好超过二十个字符的提示信息，用来验证关闭按钮' })
    expect(entries[0]!.closable).toBe(true)

    add({ content: '短提示' })
    expect(entries[1]!.closable).toBe(false)

    add({ content: '短提示-可关闭', closable: true })
    expect(entries[2]!.closable).toBe(true)
  })

  it('bumps the revision instead of stacking an identical toast', () => {
    const first = add({ type: 'success', content: '已复制' })
    const second = add({ type: 'success', content: '已复制' })
    expect(second).toBe(first)
    expect(entries).toHaveLength(1)
    expect(entries[0]!.revision).toBe(1)
  })

  it('keeps identical text apart when the type differs', () => {
    add({ type: 'success', content: '已复制' })
    add({ type: 'error', content: '已复制' })
    expect(entries).toHaveLength(2)
  })

  it('drops the oldest toast once the max is exceeded', () => {
    const first = add({ content: '1' })
    add({ content: '2' })
    add({ content: '3' })
    expect(entries).toHaveLength(2)
    expect(entries.some(entry => entry.id === first)).toBe(false)
  })
})

describe('remove', () => {
  it('calls onClose once', () => {
    const onClose = vi.fn()
    const id = add({ content: 'x', onClose })
    remove(id)
    expect(entries).toHaveLength(0)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('ignores an unknown id', () => {
    expect(() => remove(999)).not.toThrow()
  })
})

describe('update', () => {
  it('recomputes the duration when the type changes', () => {
    const id = add({ type: 'loading', content: '正在上传' })
    expect(entries[0]!.duration).toBe(0)

    update(id, { type: 'success', content: '上传成功' })
    expect(entries[0]!.type).toBe('success')
    expect(entries[0]!.duration).toBe(4000)
  })

  it('keeps the duration when only the text changes', () => {
    const id = add({
      type: 'success',
      content: 'x',
      actions: [
        { text: 'undo' },
      ],
    })
    update(id, { content: 'y' })
    expect(entries[0]!.duration).toBe(6000)
  })
})
