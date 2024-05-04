'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const LoginPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session && (
        <div>
          <div>
            ログアウトしますか？
          </div>
          <button onClick={() => signOut()}>
            ログアウト
          </button>
          <button>
            <Link href="/profile">
              プロフィールに戻る
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;