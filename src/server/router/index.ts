// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { postRouter } from './post';
import { authRouter } from './auth';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('post.', postRouter)
	.merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
