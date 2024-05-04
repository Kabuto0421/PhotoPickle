'use client'

import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session && (
        <button onClick={() => signIn()}>
          ログイン
        </button>
      )}
    </div>
  );
}

export default LoginPage;
