import axios from "axios";
import { resolve } from "path";

export const updateProfile = async (formData: FormData) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await axios
      .post(`${process.env.REACT_APP_API}/user/updateProfile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProfileURL = async (url: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await fetch(`${process.env.REACT_APP_API}/user/updateProfileURL`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        url: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateBackground = async (formData: FormData) => {
  return new Promise<boolean>(async (resolve, reject) => {
    await axios
      .post(`${process.env.REACT_APP_API}/user/updateBackground`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateBackgroundURL = async (url: string) => {
  return new Promise<boolean>((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}/user/updateBackgroundURL`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        url: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
