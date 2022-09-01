const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const path = require("path");

const { authToken } = require("../jwt-verification/AuthToken");
const { jwtEmailVCode } = require("../config");

const SendMailVerCode = (sender, password, receiver, username, veriCode) => {
  const payload = {
    username: username,
    email: receiver,
    verificationCode: veriCode,
  };

  const Usertoken = authToken(payload, jwtEmailVCode);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //smtp.office365.com
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: sender, // development account
      pass: password, // gmail verification password woudbfewkldfgkzs
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve("./sendEmailLink"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./sendEmailLink"),
    extName: ".html",
  };
  transporter.use("compile", hbs(handlebarOptions));

  transporter.sendMail(
    {
      from: '"no-reply 👻" <no-reply@iinvision.com>', // sender address
      to: receiver, // list of receivers
      subject: "Verification Code from iinvision inc.", // Subject line
      // text: "iinvison, where great ideas live", // plain text body
      template: "verifyEmail",
      context: {
        verificationCode: veriCode,
        jwtToken: Usertoken,
      },
      // html: { path: "./htmlPage/welcome.html" }, // html body
    },
    (err, result) => {
      if (err) {
        const message = "failed to send verification code to your email";
        console.log("error in sending mail", err);
        return message;
      } else {
        const message = "a verification code has been sent to you mail";
        console.log("mail sent");
        return message;
        // console.log(result.messageId, result.envelope);
      }
    }
  );
};

exports.SendMailVerCode = SendMailVerCode;
