import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to process form submission: ${error.message}` },
      { status: 500 }
    );
  }
}
