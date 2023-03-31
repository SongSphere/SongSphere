// set env variable

import User, { IUser } from "../../db/user";
import Post, {IPost} from "../../db/post"
import { savePost,
        likePost,
} from "../../services/post";

import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";
import { type } from "os";





// This creates a new backend in the database

const app = createApp("testLike");

describe("Testing liking a post", () => {
    beforeAll(async () => {
        await connect("testLike");
      });
    afterEach(async () => {
    await User.deleteMany();
    });

    afterAll(async () => {
    await mongoose.connection.close();
    });

    test("Testing liking a post", async () => {
        const user = new User({
            name: "Willy",
            username: "Magician",
            givenName: "Chi",
            middleName: "Wei",
            familyName: "Lien",
            email: "willy@gmail.com",
            emailVerified: true,
            profileImgUrl:
              "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…",
            backgroundImgUrl:
              "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…",
            token:
              "https://lh3.googleusercontent.com/a/AEdFTp6LDtlFlsOSWZstQy1jaYLjDcje3Y…c",
            followers: [],
            following: [],
            onboarded: false,
            isPrivate: false,
        });
        const savedUser = await user.save();
        const post = new Post({
            username: "Magician",
            userEmail: "willy@gmail.com",
            caption:"nice",
            music:  {

            },
            comments: new Array<String>(),
            likes: 0,
            repost: false,
        });
        savePost(post);
        

    });

})