import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({ tokensPerInterval: 3, interval: "hour", fireImmediately: true });

export async function POST(req: Request) {
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later.' }, 
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      replyTo: email, 
      subject: `Portfolio Message from ${name}`,
      text: message, 
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}