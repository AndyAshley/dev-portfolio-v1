import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // Validate environment variables
    const { SERVICE, USER, KEY } = process.env;
    if (!SERVICE || !USER || !KEY) {
      throw new Error("Missing required environment variables");
    }

    // Parse request body
    const data = await request.json();

    if (data.honey && data.honey.trim() !== "") {
      return NextResponse.json(
        { error: "Bot spam detected." },
        { status: 400 }
      );
    }

    if (!data.fName || !data.lName || !data.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create nodemailer transport
    const transporter = nodemailer.createTransport({
      service: SERVICE,
      auth: { user: USER, pass: KEY },
    });

    // Setup email options
    const mailOptions = {
      from: `"Portfolio Website" <${USER}>`,
      to: USER,
      subject: "New Contact Form Submission",
      text: `
        Name: ${data.fName} ${data.lName}
        Email: ${data.email}
        Phone: ${data.phone}
        Company: ${data.company}
        Message: ${data.message}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <ul style="list-style-type: none; padding: 0;">
          <li><strong>Name:</strong> ${data.fName} ${data.lName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Company:</strong> ${data.company}</li>
          <li><strong>Message:</strong> ${data.message}</li>
        </ul>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to process form submission: ${error.message}` },
      { status: 500 }
    );
  }
}
