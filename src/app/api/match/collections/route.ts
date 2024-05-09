import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // ログを出力
  console.log("今まで撮った画像一覧API");

  // サンプルのレスポンスを返す
  return NextResponse.json({ message: "今まで撮った画像一覧API" });
};