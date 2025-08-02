import { NextResponse } from "next/server"
import prisma from "@repo/db/client"

export async function POST() {
  try {
    const result = await prisma.user.create({
      data: {
        name: "sai",
        email: "sai@gmail.com",
      },
    })
    
    return NextResponse.json(result)
  } catch (error) {
    console.error("Prisma error:", error)
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    )
  }
}
