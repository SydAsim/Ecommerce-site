import { Resend } from "resend";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { logger } from "../../utils/logger.js"; 



const resend = new Resend (process.env.RESEND_API_KEY)


export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const { data } = await resend.emails.send({
      from: "Your Store <noreply@resend.dev>", // ← free domain (or add your own later)
      to,
      subject,
      html,
      text: text || "Your Store - Order Update",
    });

    // console.log("Email sent! ID:", data.id);
    return new ApiResponse(200, data, "Email sent successfully");

  } catch (error) {
    // console.error("Resend failed:", error.message);
    throw new ApiError("Failed to send email");
  }
};