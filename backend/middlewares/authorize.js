const expressJwt = require("express-jwt"); //got error expressJwt is not a function, then installed express-jwt@5.3.1 and it worked
const { secret } = require("../config/config.json");
const db = require("../_helpers/db");

const authorize = () => {
  return [
    expressJwt({ secret, algorithms: ["HS256"] }),
    async (req, res, next) => {
      const user = await db.User.findByPk(req.user.sub);
      if (user === null || user.role !== "Admin")
        return res.status(401).json({ message: "Unauthorized" });
      req.user = user.get();
      next();
    },
  ];
};

module.exports = authorize;
