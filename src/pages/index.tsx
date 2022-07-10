import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const { data: posts, isLoading, isError } = trpc.useQuery(['post.getAll']);
	return (
		<main>
			<h1 className="mb-6 text-5xl font-bold">This is a blog</h1>
			<p className="text-lg leading-7">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
				at tempor tortor, nec egestas erat. Praesent ut lobortis massa.
				Fusce laoreet venenatis ante, vitae luctus leo tincidunt at.
				Suspendisse consectetur, neque in sagittis tempor, magna dolor
				pretium mauris, auctor porttitor urna dolor ac magna. Quisque mi
				libero, congue eu posuere in, scelerisque ac ipsum. Ut lobortis
				felis quis leo elementum, sed vulputate tellus placerat.
				Praesent vel erat ut nibh maximus consequat vulputate ut dui.
				Morbi et elit ut est malesuada tempor. Nullam dui metus,
				dignissim ut mauris in, hendrerit porttitor diam. Ut facilisis
				consectetur convallis. Morbi augue nibh, mollis vitae imperdiet
				quis, aliquam ac elit. Mauris euismod ac risus ac hendrerit.
				Curabitur semper ultricies erat sit amet consectetur.
			</p>

			<h2>Posts</h2>
			<ul className="flex flex-col gap-4 list-none">
				{posts &&
					posts.map(post => (
						<li key={post.id}>
							<h3>{post.title}</h3>
							<p>{post.content}</p>
							<p>{post.author?.name}</p>
						</li>
					))}
			</ul>
		</main>
	);
};

export default Home;
