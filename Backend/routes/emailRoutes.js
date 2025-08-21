// // Backend/routes/emailRoutes.js
// const express = require("express");
// const nodemailer = require("nodemailer");
// const router = express.Router();

// // POST /api/email/send
// router.post("/send", async (req, res) => {
//   console.log("sending emails")
//   const { emails, subject, message } = req.body;

//   if (!emails || emails.length === 0) {
//     return res.status(400).json({ error: "No recipient emails provided" });
//   }

//   try {
//     // Configure transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_ADDRESS,    // your Gmail address
//         pass: process.env.EMAIL_PASSWORD, // your App Password
//       },
//     });
//     console.log(emails);
//     // Send mail to all recipients
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_ADDRESS,
//       to: emails.join(","), // join array into comma-separated string
//       subject,
//       text: message,
//     });

//     res.json({ success: true, info });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to send emails" });
//   }
// });


// module.exports = router;

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
