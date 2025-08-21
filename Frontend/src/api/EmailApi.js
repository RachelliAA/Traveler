// src/api/EmailApi.js

export async function sendEmail(emails, subject, message) {
    console.log("emails from frontend: ", emails);
    const res = await fetch("http://localhost:5000/api/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emails, subject, message }),
  });

  if (!res.ok) {
    throw new Error("Failed to send emails");
  }

  return await res.json();
}
