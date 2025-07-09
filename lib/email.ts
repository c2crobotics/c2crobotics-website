"use server"
import type { z } from "zod"
import type { formCSchema } from "./schemas"

// const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formCSchema>) => {
  // Simulate email sending with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Testing toast functionality
  if (Math.random() > 0.5) {
    // 50% success rate
    console.log("Email sent successfully:", emailFormData)
    return { success: true }
  } else {
    throw new Error("Failed to send email")
  }

  // for resend react
  // try {
  //   const { error } = await resend.emails.send({
  //     from: `Acme <${process.env.RESEND_FROM_EMAIL}>`,
  //     to: [emailFormData.email],
  //     subject: "Welcome",
  //     react: EmailTemplate({ firstName: emailFormData.firstName }),
  //   });

  //   if (error) {
  //     throw error;
  //   }
  //   return { success: true };
  // } catch (e) {
  //   throw e;
  // }
}
