const jwt = require("jsonwebtoken");
const config = require("config");

const Token = require("../models/Token");

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecretKey"), {
      expiresIn: "1h"
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecretKey"));
    return { accessToken, refreshToken, expiresIn: 3600 };
  }

  async save(user, refreshToken) {
    const data = await Token.findOne({ user });

    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = await Token.create({ user, refreshToken });
    return token;
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecretKey"));
    } catch (error) {
      return null;
    }
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecretKey"));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
