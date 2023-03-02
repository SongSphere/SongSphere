import { TMusicContent } from "../types/music-content";
import PostFailure from "../components/post-failure";
import PostSucess from "../components/post-sucess";
import axios from "axios";

const updateProfile = async (formData: FormData) => {
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
    console.log(err);
  }
};

export default updateProfile;
