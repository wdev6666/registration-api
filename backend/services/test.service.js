const users = require("../data/data.json");
const _ = require("underscore"); // Here, underscore.js is used to sort the users list.

const getData = async (sortBy) => { 
    var sortedUsers = _.sortBy(users, sortBy);
    return sortedUsers
};

module.exports = { getData };