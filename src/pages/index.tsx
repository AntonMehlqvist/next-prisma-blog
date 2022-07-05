import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const hello = trpc.useQuery(['example.getAll']);
	console.log(hello);


	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session?.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
				<br />
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn('google')}>Sign in</button>
		</>
	);
};

export default Home;
