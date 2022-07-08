const config = require("../config/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");

 const login = async ({ username, password }) => {
    const user = await db.User.scope('withHash').findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.hash))) throw 'Username or password is incorrect!';
    // Authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
};
 
const create = async (params) => {
     console.log(params)
    // Validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // Hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // Save user
    await db.User.create(params);
};

const getAll = async () => { 
    return await db.User.findAll();
};

const omitHash = (user) => { 
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
};

module.exports = {
    login, create, getAll
}