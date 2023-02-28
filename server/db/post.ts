import mongoose, { Schema } from "mongoose";
import { TPost } from "../../client/src/types/post";

export interface IPost {
  username: string;
  userEmail: string;
  caption: string;
  song: TPost;
}

const PostSchema = new Schema<IPost>(
  {
    username: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    song: {
      type: {
        name: String,
        artist: String,
        albumName: String,
        id: String,
        service: String,
        category: String,
      },
      required: true,
    },
  },
  {
    // this enables createdAt and updatedAt
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
