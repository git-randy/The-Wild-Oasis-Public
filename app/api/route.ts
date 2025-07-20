import { NextRequest } from "next/server"

export async function GET(request: NextRequest, {params}: {params: any}) {
  return Response.json({test: "test"})
}