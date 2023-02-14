// import packages
import mongoose, { ObjectId } from "mongoose";

// import models
import { IUser } from "../db/user";

export const saveUser = async (
  user: mongoose.Document<unknown, any, IUser>
) => {
  try {
    await user.save();
  } catch (error) {
    throw error;
  }
};
