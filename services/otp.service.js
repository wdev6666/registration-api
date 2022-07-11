const transporter = require("../_helpers/mail");
const { getUser } = require("./user.service");

const generateOtp = () => { 
    return Math.floor(Math.random() * 899999 + 100000);
};

const sendOtp = (user, otp) => { 
    var mailOptions = {
        to: user.email,
        subject: "OTP for Registration",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>. Please login to verify.</h4>"
    }

    transporter.sendMail(mailOptions, (error, data) => { 
        if (error)
            throw error.message;
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

module.exports = { generateOtp, sendOtp, verifyOtp };