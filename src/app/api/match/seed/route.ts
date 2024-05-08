import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  console.log("マーカーの緯度経度を取得するAPI");
}

export const POST = async (req: Request, res: NextResponse) => {
  console.log("マーカーの緯度経度、seed値を登録するAPI");
}