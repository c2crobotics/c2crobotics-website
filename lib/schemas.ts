import { z } from "zod"

export const formCSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not exceed 50 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must not exceed 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .max(15, { message: "Phone number is too long." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export const formRSchema = z.object({
  parentEmail: z.string().email({ message: "Please enter a valid email address." }),
  // continue schema later
  parentFirstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not exceed 50 characters." }),
  parentLastName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not exceed 50 characters." }),
  parentPhone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .max(15, { message: "Phone number is too long." }),
  
  studentEmail: z.string().email({ message: "Please enter a valid email address." }),
  studentFirstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not exceed 50 characters." }),
  studentLastName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not exceed 50 characters." }),
  studentPhone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .max(15, { message: "Phone number is too long." }),
  
})

