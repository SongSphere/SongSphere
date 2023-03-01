import mongoose, { Schema } from "mongoose";
import { TMusicContent } from "../../client/src/types/music-content";

export interface IPost {
  id: string;
  username: string;
  userEmail: string;
  caption: string;
  music: TMusicContent;
}

const PostSchema = new Schema<IPost>(
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
    caption: {
      type: String,
      required: true,
    },
    music: {
      type: {
        name: String,
        artist: String,
        albumName: String,
        id: String,
        service: String,
        category: String,
        cover: String,
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
