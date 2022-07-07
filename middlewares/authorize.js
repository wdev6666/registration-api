const jwt = require("express-jwt");
const { secret } = require("../config/config.json");
const db = require("../_helpers/db");

export const authorize = () => { 
    return [
        jwt({ secret, algorithm: ['HS256'] }),
        async (req, res, next) => { 
            const user = await db.User.findByPk(req.user.sub);
            if (!user) return res.status(401).json({ message: 'Unauthorized' });
            req.user = user.get();
            next();
        },
    ];
};