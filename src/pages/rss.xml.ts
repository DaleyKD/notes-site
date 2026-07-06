import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes', ({ data }) => !data.draft);

  return rss({
    title: 'Kyle Daley',
    description: 'Software engineering, cloud architecture, and occasional thoughts on life.',
    site: context.site!,
    items: notes
      .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
      .map((note) => ({
        title: note.data.title,
        description: note.data.description,
        pubDate: note.data.publishedAt,
        link: `/notes/${note.id.replace(/\.mdx?$/, '')}/`,
      })),
    customData: '<language>en-us</language>',
  });
}
