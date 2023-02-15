const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtLifetime = process.env.JWT_LIFETIME || "1d";

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtLifetime });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
