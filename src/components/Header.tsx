import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useScroll } from '../hooks/useScroll';

import { LoginIcon, LogoutIcon } from '@heroicons/react/solid';

const Header: React.FC = () => {
  const { scrollX = 0, scrollY = 0, scrollDirection } = useScroll();
  const { data: session } = useSession();

  return (
    <header
      className={`
			sticky top-0 w-full px-6 py-4
			${scrollY > 30 ? ' shadow-sm bg-slate-100 ' : 'bg-transparent'}
		text-neutral-900`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold">Blog</h1>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <>
              {session.user?.image && (
                <Image
                  alt="User image"
                  src={session.user.image}
                  width={36}
                  height={36}
                />
              )}
              <span className="h-max">{session.user?.name}</span>
              <button onClick={() => signOut()}>
                <LogoutIcon className="w-4 h-4 text-slate-900" />
              </button>
            </>
          ) : (
            <button onClick={() => signIn()}>
              Sign in
              <LoginIcon className="w-4 h-4 text-slate-900" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
