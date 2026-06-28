import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    kind: z.enum(['note', 'essay']),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    order: z.number().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { notes };
