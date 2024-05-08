'use client'

import Link from "next/link";
import { useSession } from "next-auth/react";
export default function ProfilePage() {
  
  const { data: session} = useSession({ required: true });

  return (
    <div>
      <Link href="/">戻る</Link>
      <h1>プロフィール</h1>
      <img src={session?.user?.image ?? ''} width={90} height={90} />
      <p>名前：{session?.user?.name}</p>
      <p>メールアドレス：{session?.user?.email}</p>
      <Link href="/logout">ログアウト</Link>
  </div>
  );
}