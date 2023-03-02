import express from "express";
import {
  sessionUpdate,
  changeNames,
  deleteUserInControllers,
  updateProfilePhoto,
} from "../controllers/user";
import fs from "fs";

// import middleware
import auth from "../middleware/auth";

const router = express.Router();

router.get("/user", auth, sessionUpdate);
router.post("/user/adjustNames", auth, changeNames);
router.post("/user/deleteAccount", auth, deleteUserInControllers);
// router.post("/user/updateProfile", auth, updateProfilePhoto);

import multer from "multer";
const upload = multer({ dest: "images/" });
router.post(
  "/user/updateProfile",
  //upload.single("image"),
  auth,
  updateProfilePhoto
);
router.get("/user/images/:imageName", (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then

  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
});
router.use("/user/images", express.static("images"));

// router.post("/user/updateProfile", upload.single("image"), (req, res) => {
//   // 4
//   console.log(req.body.formData);
//   const imageName = req.file.filename;
//   //const description = req.description;

//   // Save this data to a database probably

//   console.log(imageName);
//   res.send({ imageName });
// });
export default router;
