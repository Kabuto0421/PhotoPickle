import { redirect } from "next/navigation"
import { getAuthSession } from "@/libs/nextauth"
import Login from "@/libs/components/auth/Login"

// ログインページ
const LoginPage = async () => {
  const user = await getAuthSession()

  if (user) {
    redirect("/")
  }

  return <Login />
}

export default LoginPage