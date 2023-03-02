import { TMusicContent } from "../types/music-content";
import PostFailure from "../components/post-failure";
import PostSucess from "../components/post-sucess";
import axios from "axios";

const updateProfile = async (formData: FormData) => {
  // var enc = new TextDecoder("utf-8");
  // var arr = new Uint8Array(arrayBuffer);
  // const arrayBufferStr = enc.decode(arr);
  // const bytes = new Uint8Array(arrayBuffer);
  // const dv = new DataView(bytes.buffer);
  // //const arrayBufferStr = dv.getUint16(0, true).toString();
  // const arrayBufferStr = String.fromCharCode.apply(
  //   null,
  //   Array.from(new Uint8Array(arrayBuffer))
  // );
  try {
    //console.log(arrayBufferStr);
    // await fetch(`${process.env.REACT_APP_API}/user/updateProfile`, {
    //   method: "POST",
    //   credentials: "include",
    //   body: JSON.stringify({
    //     formData: formData,
    //   }),
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    await axios.post(
      `${process.env.REACT_APP_API}/user/updateProfile`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  } catch (err) {
    console.log(err);
    PostFailure();
  }
  PostSucess();
};

export default updateProfile;
