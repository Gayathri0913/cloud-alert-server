const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const NOTIFY_TO = process.env.NOTIFY_TO;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.ip;
  const msg = `☁️ New visitor from IP: ${ip}`;

  transporter.sendMail({
    from: EMAIL_USER,
    to: NOTIFY_TO,
    subject: "New Cloud Visit Alert 🌩️",
    text: msg
  }, (err, info) => {
    if (err) console.log("Email error:", err);
    else console.log("Alert sent:", info.response);
  });

  res.send("Your cloud server is online! 📡");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
