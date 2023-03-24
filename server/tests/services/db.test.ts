// set env variable
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";


// import db
import { connect } from "../../db/connect";
import User, { IUser } from "../../db/user";
import { checkUser, createUser, fetchUserById, saveUser, updateUserToken } from "../../services/user";


// describe("Testing db services", () => {
//   const testToken = process.env.DEBUG_GOOGLE_TOKEN;

//   beforeAll(async () => {
//     await connect("testDBServices");
//   });

//   afterEach(async () => {
//     await User.deleteMany();
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });



//   test("Testing check user", async () => {
//     const userData = await validateToken(testToken);
//     const user = await createUser(userData, testToken);

//     try {
//       await saveUser(user);
//     } catch (error) {
//       console.error(error);
//     }

//     const existEmail = process.env.DEBUG_EMAIL;
//     const notExistEmail = "this is an email that does not exist";
//     const shouldExist = await checkUser(existEmail);

//     expect(shouldExist).toEqual({ _id: user._id });
//     const shouldNotExist = await checkUser(notExistEmail);
//     expect(shouldNotExist).toBe(null);
//   });
// });
