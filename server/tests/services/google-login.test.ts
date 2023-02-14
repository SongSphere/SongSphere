import * as dotenv from "dotenv";
dotenv.config();

import { validateToken } from "../../services/google-login";

describe("Testing google-login services", () => {
  const testToken = process.env.DEBUG_GOOGLE_TOKEN;
  test("Testing user token validation", () => {
    expect(validateToken(testToken)).resolves.toMatchObject({
      name: process.env.DEBUG_NAME,
      given_name: process.env.DEBUG_GIVEN_NAME,
      family_name: process.env.DEBUG_FAMILY_NAME,
      email: process.env.DEBUG_EMAIL,
      email_verified: process.env.DEBUG_EMAIL_VERIFIED,
      picture: process.env.DEBUG_PICTURE,
    });
  });
});
