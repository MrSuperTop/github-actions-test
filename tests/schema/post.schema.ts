import z from 'zod';

export const postSchema = z.object({
  id: z.number(),
  title: z.string()
});

export const postsSchema = z.array(postSchema);
