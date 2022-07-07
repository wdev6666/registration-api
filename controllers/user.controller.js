const userService = require("../services/user.service");

const register = (req, res, next) => { 
    userService.create(req.body).then(() => { res.json({message: "Registration Successful!"})}).catch(next);
};

module.exports = {
    register
}