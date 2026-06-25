import { NextResponse } from "next/server";

export function middleware() {
  console.log("middleware disabled");
  return NextResponse.next();
}