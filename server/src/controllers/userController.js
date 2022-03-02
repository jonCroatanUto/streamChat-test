const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat");
const { connect } = require("getstream");
const axios = require("axios");
const crypto = require("crypto");

const { config } = require("../config");
const { chatApiKey, chatApiSectert, chatApiId } = config.db;
async function createNewUser(req, res) {
  const { email, password, userName, phone } = req.body;

  try {
    //const foundUser = await userModel.findOne({ email: email });
    // if (foundUser) {
    //   return res.stauts(200).send({
    //     message: `the user with this email ${foundUser.email}, already exist`,
    //     succes: false,
    //   });
    // } else {
    console.log(chatApiKey, chatApiSectert, chatApiId);
    const serverClient = connect(chatApiKey, chatApiSectert, chatApiId);

    const UserId = crypto.randomBytes(16).toString("hex");

    const token = serverClient.createUserToken(UserId);

    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password, salt);
    //   const newUser = await userModel.create({
    //     email: email,
    //     password: encrypted,

    //     ...rest,
    //   });
    res.status(200).json({
      userName,
      token,
      phone,
      encrypted,
      UserId,
    });
    //}
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

async function login(req, res) {
  const { password, userName } = req.body;
  console.log(password, userName);
  try {
    //console.log("credentials---->", chatApiKey, chatApiSectert, chatApiId);
    const serverClient = connect(chatApiKey, chatApiSectert, chatApiId);
    //console.log("server---->", serverClient);
    const client = StreamChat.StreamChat.getInstance(
      chatApiKey,
      chatApiSectert
    );
    // console.log("client---->", client);
    const { users } = client.queryUsers({ name: userName });
    console.log("user---->", users);
    const succes = await bcrypt.compare(password, users[0].encrypted);
    const token = serverClient.createUserToken(users[0].id);
    if (succes) {
      res.status(200).json({ token, userName, userId: users[0].id });
    } else {
      res.status(200).json({ message: "incorrect password" });
    }
    //const foundUser = await userModel.findOne({ email: email });
    // if (!foundUser) {
    //   return res.status(404).send({
    //     message: `Sorry this email ${email}, is not register yet`,
    //     succes: false,
    //   });
    // } else {
    //   bcrypt.compare(password, foundUser.password).then((isExist) => {
    //     if (isExist) {
    //       return res.status(200).send({
    //         message: `Welcome back ${foundUser.name}`,
    //         succes: true,
    //         foundUser: foundUser,
    //       });
    //     } else {
    //       return res.status(500).send({
    //         message: "incorrect password",
    //         succes: false,
    //       });
    //     }
    //   });
    // }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}
async function getUser(req, res) {
  try {
    const users = await userModel.find({}).populate("shopList");
    if (users.length <= 0) {
      return res.status(200).send({
        message: "No users",
      });
    } else {
      return res.status(200).send({
        users: users,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = {
  createNewUser: createNewUser,
  login: login,
  getUser: getUser,
};
