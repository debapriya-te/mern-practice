const { mongoose } = require("../db_connection");
const argon2id = require("argon2");

const userSchemea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

userSchemea.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await argon2id.hash(this.password);
  next();
});

userSchemea.methods.comparePassword = async function (password) {
  return await argon2id.verify(this.password, password);
};

const User = mongoose.model("User", userSchemea);
module.exports = User;
