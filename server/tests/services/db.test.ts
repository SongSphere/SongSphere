import * as dotenv from "dotenv";
dotenv.config();

import { createUser, fetchUser, saveUser } from "../../services/db";
import { connect } from "../../db/connect";
import { validateToken } from "../../services/google-login";
import mongoose from "mongoose";

describe("Testing db services", () => {
  connect();
  const testToken = process.env.DEBUG_GOOGLE_TOKEN;
  test("Testing user create, save, and fetch", async () => {
    const userData = await validateToken(testToken);
    const user = await createUser(userData, testToken);

    expect(user).toMatchObject({
      name: process.env.DEBUG_NAME,
      givenName: process.env.DEBUG_GIVEN_NAME,
      familyName: process.env.DEBUG_FAMILY_NAME,
      email: process.env.DEBUG_EMAIL,
      emailVerified: process.env.DEBUG_EMAIL_VERIFIED == "true",
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
      emailVerified: true,
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
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
