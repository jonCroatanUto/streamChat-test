const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
      require: [true, "please we need your email"],
    },
    password: {
      type: String,
      default: "",
      require: [true, "please we need your password"],
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    adress: {
      type: String,
      default: "",
      require: [true, "please we need your adress"],
    },
    shopList: [
      {
        type: Schema.Types.ObjectId,
        ref: "shopList",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("users", UserSchema);
module.exports = Users;
