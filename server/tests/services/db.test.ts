import * as dotenv from "dotenv";
dotenv.config();

import { createUser, saveUser } from "../../services/db";
import { validateToken } from "../../services/google-login";

describe("Testing db services", async () => {
  const testToken = process.env.DEBUG_GOOGLE_TOKEN;
  const userData = validateToken(testToken);
  const user = createUser(await userData, testToken);
  test("Testing user create", async () => {
    expect(user).resolves.toMatchObject({
      name: process.env.DEBUG_NAME,
      givenName: process.env.DEBUG_GIVEN_NAME,
      familyName: process.env.DEBUG_FAMILY_NAME,
      email: process.env.DEBUG_EMAIL,
      emailVerified: process.env.DEBUG_EMAIL_VERIFIED == "true",
      profileImgUrl: process.env.DEBUG_PICTURE,
      token: testToken,
    });
  });

  test("Testing user save", async () => {});
});
