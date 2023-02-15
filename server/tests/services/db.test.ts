// set env variable
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

// import services
import {
  createUser,
  fetchUser,
  saveUser,
  updateUserToken,
  checkUser,
} from "../../services/db";
import { validateToken } from "../../services/google-login";

// import db
import { connect } from "../../db/connect";
import User, { IUser } from "../../db/user";

describe("Testing db services", () => {
  const testToken = process.env.DEBUG_GOOGLE_TOKEN;

  beforeAll(async () => {
    await connect("testDBServices");
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing user create, save, and fetch", async () => {
    const userData = await validateToken(testToken);
    const user = await createUser(userData, testToken);
    expect(user).toMatchObject({
      name: process.env.DEBUG_NAME,
      givenName: process.env.DEBUG_GIVEN_NAME,
      familyName: process.env.DEBUG_FAMILY_NAME,
      email: process.env.DEBUG_EMAIL,
      emailVerified: process.env.DEBUG_EMAIL_VERIFIED == "true", // convert string to boolean
      profileImgUrl: process.env.DEBUG_PICTURE,
      token: testToken,
    });

    try {
      await saveUser(user);
    } catch (error) {
      console.error(error);
    }
    const fetchedUser = await fetchUser(user.id);

    expect(fetchedUser).toMatchObject({
      name: process.env.DEBUG_NAME,
      givenName: process.env.DEBUG_GIVEN_NAME,
      familyName: process.env.DEBUG_FAMILY_NAME,
      email: process.env.DEBUG_EMAIL,
      emailVerified: process.env.DEBUG_EMAIL_VERIFIED == "true", // convert string to boolean
      profileImgUrl: process.env.DEBUG_PICTURE,
      token: testToken,
    });
  });

  test("Testing user create with insufficient data", async () => {
    const userData = await validateToken(testToken);
    userData.name = undefined;
    const user = await createUser(userData, testToken);
    let error;
    try {
      await saveUser(user);
    } catch (err) {
      error = err;
    }
    expect(error.errors["name"].message).toBe("Path `name` is required.");
  });

  test("Testing updateUserToken", async () => {
    const userData = await validateToken(testToken);
    const user = await createUser(userData, testToken);

    try {
      await saveUser(user);
    } catch (error) {
      console.error(error);
    }

    const newToken = "new token";
    const updatedUser = await updateUserToken(
      process.env.DEBUG_EMAIL,
      newToken
    );
    expect(updatedUser).toMatchObject({
      name: process.env.DEBUG_NAME,
      givenName: process.env.DEBUG_GIVEN_NAME,
      familyName: process.env.DEBUG_FAMILY_NAME,
      email: process.env.DEBUG_EMAIL,
      emailVerified: process.env.DEBUG_EMAIL_VERIFIED == "true", // convert string to boolean
      profileImgUrl: process.env.DEBUG_PICTURE,
      token: newToken,
    });
  });

  test("Testing check user", async () => {
    const userData = await validateToken(testToken);
    const user = await createUser(userData, testToken);

    try {
      await saveUser(user);
    } catch (error) {
      console.error(error);
    }

    const existEmail = process.env.DEBUG_EMAIL;
    const notExistEmail = "this is an email that does not exist";
    const shouldExist = await checkUser(existEmail);

    expect(shouldExist).toEqual({ _id: user._id });
    const shouldNotExist = await checkUser(notExistEmail);
    expect(shouldNotExist).toBe(null);
  });
});
