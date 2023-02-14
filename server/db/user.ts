import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    profileImgUrl: {
      type: String,
      required: true,
    },
  },
  {
    // this enables createdAt and updatedAt
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
