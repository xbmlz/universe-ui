const tokenModules = import.meta.glob('../../../packages/tokens/src/*.css', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const tokensCss = Object.entries(tokenModules)
  .filter(([path]) => !path.endsWith('index.css') && !path.endsWith('tailwind.css'))
  .map(([, css]) => css.replace(/@import[^;]+;/g, ''))
  .join('\n')
