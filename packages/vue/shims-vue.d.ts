/*
 * `tsc` cannot parse single-file components. The typecheck pass covers the plain
 * TypeScript in `src` only; `.vue` files are declared here so their imports resolve.
 * Replacing this with `vue-tsc` would extend the check into the SFCs themselves.
 */
declare module '*.css'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
