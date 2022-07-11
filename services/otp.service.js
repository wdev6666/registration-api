const transporter = require("../_helpers/mail");
const fast2sms = require("fast-two-sms");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "../../.env") });

const generateOtp = () => {
  return Math.floor(Math.random() * 899999 + 100000);
};

const sendOtp = (user, otp) => {
  var mailOptions = {
    to: user.email,
    subject: "OTP for Registration",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>. Please login to verify.</h4>",
  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) throw error.message;
    return "OTP sent!";
  });
};

const verifyOtp = async (userId, otp) => {
  const user = await db.User.findByPk(userId);
  if (user.email_otp == otp) {
    user.email_otp = "";
    await user.save();
    return "OTP verified successfuly";
  } else {
    throw "OTP is incorrect!";
  }
};

const sendMessage = (user, otp) => {
  const message = "Your OTP for application is: <b>" + otp + "</b>";
  var options = {
    authorization: process.env.SMS_API_KEY,
    message: message,
    numbers: [user.mobile],
  };

  console.log(options);
  fast2sms
    .sendMessage(options)
    .then((data) => {
      return "OTP sent";
    })
    .catch((error) => {
      throw error.message;
    });
};

module.exports = { generateOtp, sendOtp, verifyOtp, sendMessage };
