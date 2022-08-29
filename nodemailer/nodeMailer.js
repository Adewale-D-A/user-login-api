const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");

const fs = require("fs");

const SendMail = (email, password) => {
  fs.readFile("./htmlPage/response.html", "utf-8", async (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    if (result) {
      const template = Handlebars.compile(result.toString());
      const replace = {
        username: "Dami",
      };
      const htmlToSend = template(replace);

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", //smtp.office365.com
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: email, // development account
          pass: password, // gmail verification password woudbfewkldfgkzs
        },
      });

      let info = await transporter.sendMail({
        from: '"no-reply 👻" <no-reply@iinvision.com>', // sender address
        to: "walexywalex@gmail.com", // list of receivers
        subject: "Welcome to iinvision", // Subject line
        text: "iinvison, where great ideas live", // plain text body
        html: htmlToSend, // html body
      });
      console.log("done");
    }
  });

  // console.log("Message sent: %s", info);
};

exports.SendMail = SendMail;
