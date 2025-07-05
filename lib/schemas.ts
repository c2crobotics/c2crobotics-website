import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }).max(50, { message: "First name must not exceed 50 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }).max(50, { message: "Last name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).max(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})