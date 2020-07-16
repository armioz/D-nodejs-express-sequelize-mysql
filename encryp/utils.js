const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function genHashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

function verifyPassword(password, user) {
  return bcrypt.compare(password, user.password);
}

function resMessage({ succ, msg, data }) {
  return {
    success: succ || false,
    message: msg || null,
    data: data || null,
  };
}

function checkAuthJWT() {
  return passport.authenticate("jwt", { session: false });
}

const splitToken = (token) => {
  const splited = token.split(" ");
  return splited[1];
};

const userIdFromToken = (req) => {
  const authToken = req.headers["authorization"];
  const token = splitToken(authToken);
  const decoded = jwt.decode(token);
  return decoded.id;
};

module.exports = {
  resMessage,
  genHashPassword,
  verifyPassword,
  checkAuthJWT,
  userIdFromToken,
};
