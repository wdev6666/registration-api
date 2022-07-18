const testService = require("../services/test.service");

const get = (req, res, next) => { 
    const sortBy = req.params["sortby"];
    testService.getData(sortBy).then(users => { res.json(users); }).catch(next);
};

module.exports = { get };