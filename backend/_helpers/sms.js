const fast2sms = require("fast-two-sms");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "../../.env") });

const sendMessage = (otp, user) => {
  const message = "Your OTP for application is: <b>" + otp + "</b>";
  var options = {
    authorization: process.env.SMS_API_KEY,
    message: message,
    numbers: [user.mobile],
  };

  fast2sms
    .sendMessage(options)
    .then((data) => {})
    .catch((error) => {
      next(error);
    });
};
