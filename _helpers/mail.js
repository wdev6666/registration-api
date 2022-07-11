const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        user: "wdev6666@gmail.com",
        pass: "nbblcwtorkogcycv"
    }
});

module.exports = transporter;