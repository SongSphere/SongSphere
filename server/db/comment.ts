import mongoose, { Schema } from "mongoose";
import { TMusicContent } from "../../client/src/types/music-content";

export interface IComment {
  id: string;
  username: string;
  userEmail: string;
  text: string;
  subComments: Array<String>;
}

const CommentSchema = new Schema<IComment>(
  {
    id: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    subComments: {
      type: Array<String>(),
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
