import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

/**
 * Turns `:::demo button/basic 描述` into a `<Demo>` block. The demo component
 * resolves the example SFC from docs/examples by path.
 */
export function demoPlugin(md: MarkdownIt) {
  md.use(container, 'demo', {
    // markdown-it-container passes the whole line after `:::`, including the name.
    validate: (params: string) => /^demo\s+[\w-]+\/[\w-]+/.test(params.trim()),
    render(tokens, idx) {
      const token = tokens[idx]

      if (token.nesting === 1) {
        const info = token.info.trim().slice('demo'.length).trim()
        const [path, ...rest] = info.split(/\s+/)
        const description = md.utils.escapeHtml(rest.join(' '))
        return `<Demo path="${path}" description="${description}">\n`
      }

      return '</Demo>\n'
    },
  })
}
