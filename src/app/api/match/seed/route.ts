import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // ログを出力
  console.log("マーカーの緯度経度を取得するAPI");

  // サンプルのレスポンスを返す
  return NextResponse.json({ message: "マーカーの緯度経度を取得するAPI" });
};

export const POST = async (req: Request) => {
  // リクエストの内容を取得
  const data = await req.json();

  // ログを出力
  console.log("マーカーの緯度経度、seed値を登録するAPI", data);

  // サンプルのレスポンスを返す
  return NextResponse.json({ message: "マーカーの緯度経度、seed値を登録するAPI" });
};