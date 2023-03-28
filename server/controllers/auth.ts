// import packages
import { Request, Response, NextFunction } from "express";
import qs from "qs";
import axios from "axios";

// import services
import { validateToken } from "../services/google-sign-in-up";
import {
  createUser,
  checkUser,
  saveUser,
  updateUserToken,
  updateSpotifyTokens,
  removeSpotifyTokens,
  updateAppleToken,
  removeAppleToken,
} from "../services/user";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(
  `${client_id}:${client_secret}`,
  "utf-8"
).toString("base64");

export const spotifyAuth = async (req: Request, res: Response) => {
  const email = req.session.user.email;
  const remove = req.body.remove;

  const data = qs.stringify({
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: "http://localhost:3000/onboard",
  });

  let tokenRes;
  try {
    tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      {
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (tokenRes.status != 200) {
      throw new Error("fetch token failed with invalid data");
    }

    const spotifyToken = tokenRes.data.access_token;
    const spotifyRefreshToken = tokenRes.data.refresh_token;

    if (remove) {
      try {
        await removeSpotifyTokens(email);
        res.status(201);
        res.json({ msg: "spotify tokens successfully updated" });
      } catch (error) {
        console.error(error);
        res.json({ error: error });
      }
    } else {
      try {
        await updateSpotifyTokens(email, spotifyToken, spotifyRefreshToken);
        res.status(201);
        res.json({ msg: "spotify tokens successfully updated" });
      } catch (error) {
        console.error(error);
        res.json({ error: error });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ msg: "token fetch failed" });
  }
};

export const spotifyRefresh = async (req: Request, res: Response) => {
  const email = req.session.user.email;
  const refresh_token = req.body.refresh_token;

  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  });

  let tokenRes;

  try {
    tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      {
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (tokenRes.status != 200) {
      throw new Error("fetch token failed with invalid data");
    }

    const spotifyToken = tokenRes.data.access_token;

    try {
      await updateSpotifyTokens(email, spotifyToken, refresh_token);
      res.status(201);
      res.json({ new_token: spotifyToken });
    } catch (error) {
      console.log(error);
      res.json({ error: error });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ msg: "token fetch failed" });
  }
};

export const appleAuth = async (req: Request, res: Response) => {
  const email = req.session.user.email;
  const appleToken = req.body.appleToken;
  const remove = req.body.remove;

  if (remove) {
    try {
      await removeAppleToken(email);
      res.status(201);
      res.json({ msg: "apple token successfully updated" });
    } catch (error) {
      console.error(error);
      res.json({ error: error });
    }
  } else {
    try {
      await updateAppleToken(email, appleToken);
      res.status(201);
      res.json({ msg: "apple token successfully updated" });
    } catch (error) {
      console.error(error);
      res.json({ error: error });
    }
  }
};

export const signInUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  let existingAccount = true;
  try {
    const userData = await validateToken(token);
    const exist = await checkUser(userData.email);
    if (exist) {
      // exist == document with _id
      await updateUserToken(userData.email, token);
    } else {
      // exist == null
      const user = await createUser(userData, token);
      existingAccount = false;
      await saveUser(user);
    }

    req.session.user = {
      name: userData.name,
      username: "",
      givenName: userData.given_name,
      middleName: "",
      familyName: userData.family_name,
      email: userData.email,
      emailVerified: userData.email_verified,
      profileImgUrl: userData.picture,
      backgroundImgUrl: userData.picture,
      token: token,
      spotifyToken: "",
      spotifyRefreshToken: "",
      appleToken: "",
      followers: Array<String>(),
      following: Array<String>(),
      blockedUsers: Array<String>(),
      blockedBy: Array<String>(),
      onboarded: false,
      isPrivate: false,
      likes: Array<String>(),
    };

    res.status(201);
    res.json({ user: req.session.user, existingAccount: existingAccount });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error });
  }
};

export const testauth = (req: Request, res: Response) => {
  res.send("welcome. you are logged in");
};

export const signout = async (req: Request, res: Response) => {
  await req.session.destroy((error) => {
    if (error) {
      res.status(500);
      res.json({ msg: "signout fail" });
    } else {
      res.status(200);
      res.json({ msg: "signout success" });
    }
  });
};
