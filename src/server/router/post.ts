import { createRouter } from './context';
import { z } from 'zod';

export const postRouter = createRouter()
	.query('getAll', {
		async resolve({ ctx }) {
			return await ctx.prisma.post.findMany();
		},
	})
	.mutation('create', {
		input: z.object({
			title: z.string().min(3).max(255),
			content: z.string().min(1),
		}),
		async resolve({ ctx: { session, prisma }, input }) {
			if (!session?.user) return { message: 'Unauthorized' };

			const newPost = prisma.post.create({
				data: {
					title: input.title,
					content: input.content,
					author: {
						connect: {
							email: session.user.email as string,
						},
					},
				},
				include: {
					author: {
						include: {
							Profile: {
								include: {
									user: {
										include: {},
									},
								},
							},
						},
					},
				},
			});

			return newPost;
		},
	});
