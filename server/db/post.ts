import mongoose, { Schema } from "mongoose";
import { TMusicContent } from "../../client/src/types/music-content";

export interface IPost {
  id: string;
  username: string;
  userEmail: string;
  caption: string;
  music: TMusicContent;
  comments: Array<String>;
  likes: number;
  repost: boolean;
  taggedUsers: Array<String>;
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
    comments: {
      type: Array<String>(),
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    repost: {
      type: Boolean,
      required: true,
    },
    taggedUsers: {
      type: Array<String>(),
      required: false,
    }
  },
  {
    // this enables createdAt and updatedAt
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
