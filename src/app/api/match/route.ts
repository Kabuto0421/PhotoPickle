import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // ログを出力
  console.log("画像入力API");

  // サンプルのレスポンスを返す
  return NextResponse.json({ message: "画像入力API" });
};