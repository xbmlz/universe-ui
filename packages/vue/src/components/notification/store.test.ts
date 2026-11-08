import { beforeEach, describe, expect, it, vi } from 'vitest'
import { add, config, defaultDuration, entries, remove, update } from './store'

beforeEach(() => {
  entries.splice(0, entries.length)
  config.value = { max: 0, top: 16, right: 16 }
})

describe('defaultDuration', () => {
  it('holds a notification with actions open', () => {
    expect(defaultDuration({
      title: 't',
      content: 'c',
      actions: [
        { text: 'undo' },
      ],
    })).toBe(0)
  })

  it('closes a plain notification after 4s', () => {
    expect(defaultDuration({ title: 't', content: 'c' })).toBe(4000)
  })
})

describe('add', () => {
  it('puts the newest notification first', () => {
    add({ title: 'first', content: 'a' })
    add({ title: 'second', content: 'b' })
    expect(entries[0]!.title).toBe('second')
  })

  it('keeps everything when max is 0', () => {
    for (let i = 0; i < 5; i++)
      add({ title: `n${i}`, content: 'c' })
    expect(entries).toHaveLength(5)
  })

  it('drops the oldest once max is set', () => {
    config.value = { max: 2, top: 16, right: 16 }
    const first = add({ title: '1', content: 'c' })
    add({ title: '2', content: 'c' })
    add({ title: '3', content: 'c' })
    expect(entries).toHaveLength(2)
    expect(entries.some(entry => entry.id === first)).toBe(false)
  })
})

describe('remove', () => {
  it('calls onClose once', () => {
    const onClose = vi.fn()
    const id = add({ title: 't', content: 'c', onClose })
    remove(id)
    expect(entries).toHaveLength(0)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe('update', () => {
  it('merges the patch and bumps the revision', () => {
    const id = add({ title: 't', content: 'c' })
    update(id, { content: 'next' })
    expect(entries[0]!.content).toBe('next')
    expect(entries[0]!.revision).toBe(1)
  })
})
