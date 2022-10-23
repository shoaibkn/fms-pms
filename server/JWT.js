const { sign, verify } = require("jsonwebtoken");
const { versionSuffix } = require("oracledb");
const secret = "accesstokensecret";
const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, module_ids: user.module_ids },
    secret
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, secret);
    if (validToken) {
      req.authenticated = true;
      console.log("-----------------------User Verified");
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createToken, validateToken };
