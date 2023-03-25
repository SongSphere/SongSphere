import mongoose, { Schema } from "mongoose";

export interface IFollowRequest {
  id: string;
  followerUsername: string;
  username: string;
}

const FollowRequestSchema = new Schema<IFollowRequest>({
  id: {
    type: String,
    required: false,
  },
  followerUsername: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const FollowRequest = mongoose.model<IFollowRequest>(
  "FollowRequest",
  FollowRequestSchema
);
export default FollowRequest;
