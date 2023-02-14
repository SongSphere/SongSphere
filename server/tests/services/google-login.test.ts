import * as dotenv from "dotenv";
dotenv.config();

import { validateToken } from "../../services/google-login";

describe("testing login controller", () => {
  const testToken = process.env.DEBUG_GOOGLE_TOKEN;
  test("testing user token validation", () => {
    expect(validateToken(testToken)).resolves.toMatchObject({
      name: "Willy Lien",
      given_name: "Willy",
      family_name: "Lien",
      email: "crashingballoon@gmail.com",
      email_verified: true,
      picture:
        "https://lh3.googleusercontent.com/a/AEdFTp7VQi0KaRITkjrZblY_SYGCS3H2xxeH783DVSY4kg=s96-c",
    });
  });
});
