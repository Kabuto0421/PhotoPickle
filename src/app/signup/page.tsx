import { redirect } from "next/navigation"
import { getAuthSession } from "@/libs/nextauth"
import Signup from "@/libs/components/Signup"

// アカウント仮登録ページ
const SignupPage = async () => {
  const user = await getAuthSession()

  if (user) {
    redirect("/")
  }

  return <Signup />
}

export default SignupPage