import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { FormEvent, useState } from 'react';
import { trpc } from '../utils/trpc';
import { authOptions } from './api/auth/[...nextauth]';

const Create: NextPage = () => {
	const mutation = trpc.useMutation(['post.create']);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutation.mutate({
			title,
			content,
		});
	};
	return (
		<main>
			<h1 className="mb-6 text-5xl font-bold">Create a blog post</h1>
			<p className="text-lg leading-7">
				Fill out the form to create a new post
			</p>
			<form onSubmit={handleSubmit} className="flex flex-col max-w-2xl">
				<label htmlFor="title">Title</label>
				<input
					className="p-2"
					name="title"
					onChange={e => setTitle(e.target.value)}
					value={title}
					type="text"
					maxLength={255}
				/>

				<label htmlFor="content">Content</label>
				<textarea
					className="p-2"
					name="content"
					onChange={e => setContent(e.target.value)}
					value={content}
					cols={30}
					rows={10}
				/>
				<button>Create post</button>
			</form>
		</main>
	);
};

export async function getServerSideProps(context: any) {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	console.log(session?.user);

	if (!session?.user || session.user.role !== 'ADMIN') {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}

	return { props: {} };
}

export default Create;
