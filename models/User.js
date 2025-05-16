import { models, Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  lastName: String,
  todos: [{ title: String, status: String }],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

//اگر داخل مدل یوزر بود که هیچی اگر نبود مدل رو براساس اسکیما بساز
const User = models.User || model("User", userSchema);

export default User;
