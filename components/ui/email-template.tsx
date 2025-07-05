import type * as React from "react"

interface EmailTemplateProps {
  firstName: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Thanks for contacting us.</p>
  </div>
)
