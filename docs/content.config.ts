import { defineCollection } from '@nuxt/content'
import { z } from 'zod'

const link = z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string(),
  target: z.string().optional()
})

export const collections = {
  docs: defineCollection({
    type: 'page',
    source: [{
      include: 'docs/**/*'
    }],
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      category: z.enum(['guide', 'component']).optional(),
      navigation: z.object({
        title: z.string().optional()
      }).optional(),
      links: z.array(link).optional()
    })
  })
}
