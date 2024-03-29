import axios from "axios";

export const updateProfile = async (formData: FormData) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API}/user/updateProfile`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const updateProfileURL = async (url: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/user/updateProfileURL`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        url: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateBackground = async (formData: FormData) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API}/user/updateBackground`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

export const updateBackgroundURL = async (url: string) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/user/updateBackgroundURL`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        url: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
  }
};
