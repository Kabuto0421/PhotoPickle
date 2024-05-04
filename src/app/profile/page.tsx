import Link from "next/link";

export default async function ProfilePage() {

  return (
    <div>
      <Link href="/">戻る</Link>
    
      <h1>アカウント設定</h1>

      <Link href="/logout">ログアウト</Link>
    </div>
  );
}