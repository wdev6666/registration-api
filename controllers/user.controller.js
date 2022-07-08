const userService = require("../services/user.service");

const register = (req, res, next) => { 
    userService.create(req.body).then(() => { res.json({message: "Registration Successful!"})}).catch(next);
};

const login = (req, res, next) => { 
    userService.login(req.body).then((user) =>  res.json(user) ).catch(next);
};

const getAll = (req, res, next) => { 
    userService.getAll().then((users) => res.json(users)).catch(next);
};

module.exports = {
    register, getAll, login
}