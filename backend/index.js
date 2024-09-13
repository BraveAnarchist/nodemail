import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const port = 6969;
const app = express();
app.use(cors({ options: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sendEmail", (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.name,
      pass: process.env.password,
    },
  });

  let msg = {
    from: process.env.name,
    to: email,
    subject: "Message sent using nodemailer",
    text: `hi ${name} with email ${email}. Here is a message - ${message}`,
  };

  transporter
    .sendMail(msg)
    .then((info) => {
      console.log("Email Sent: " + info.response);
      res.status(200).send("Done");
    })
    .catch((err) => {console.log(err)
      res.status(403).send("error:"+ err)
    });
});

app.listen(port, () => console.log("Server has started"));