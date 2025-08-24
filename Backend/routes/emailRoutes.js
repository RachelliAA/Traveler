// Backend/routes/emailRoutes.js
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// POST /api/email/send
router.post("/send", async (req, res) => {
  console.log("Sending emails...");
  const { emails, subject, message } = req.body;

  if (!emails || emails.length === 0) {
    return res.status(400).json({ error: "No recipient emails provided" });
  }

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const results = [];

  for (const email of emails) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject,
        text: message,
      });
      results.push({ email, success: true, info });
    } catch (err) {
      results.push({ email, success: false, error: err.message });
    }
  }

  // Respond with detailed per-email results
  res.json({ results });
});


module.exports = router;
