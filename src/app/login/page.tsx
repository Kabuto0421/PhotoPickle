'use client'

import { useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');  // トップページにリダイレクト
    }
  }, [session, router]);

  return (
    <div>
      {!session && (
        <button onClick={() => signIn()}>
          ログイン
        </button>
      )}

      {session && (
        <button onClick={() => signOut()}>
          ログアウト
        </button>
      )}
    </div>
  );
}

export default LoginPage;
