const jwt = require("express-jwt");
require('dotenv').config()
const secret = process.env.JWT_SECRET;

const authenticate = jwt({
	secret: secret
});

module.exports = authenticate;