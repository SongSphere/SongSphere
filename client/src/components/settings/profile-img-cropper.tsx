// This file was heavily inspired by react-image-crop-demo linked here https://github.com/optimus-prime343/react-image-crop-demo

import { useState, useRef, useEffect } from "react";
import { Box, FileInput, Divider, Modal, Slider, Stack } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import EasyCrop from "react-easy-crop";
import type { Point, Area } from "react-easy-crop/types";
import {
  updateProfile,
  updateProfileURL,
} from "../../services/user/send-image";

import { getCroppedImg } from "../../utils/crop-image";
import fetchUser from "../../services/user/fetch-user";
import Session from "../../session";
import FailPopUp from "../popup/fail-popup";

interface ReactImageCropperProps {
  onCropComplete: (formData: FormData) => void;
}

const ProfileImgCropper = (props: ReactImageCropperProps) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<
    Area | undefined
  >();
  const [profileFailOpen, setProfileFailOpen] = useState(false);
  const PROFILE_ERR_MSG =
    "Oops! An error occurs when you try to update your profile image. Try again later!";
  const [image, setImage] = useState("");
  const [ImgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    const user = Session.getUser();
    if (user) {
      setImage(user.profileImgUrl);
    }
  }, [Session.getUser()]);

  const useStyles = createStyles(() => ({
    container: {
      minHeight: "10vh",
      display: "flex",
    },
    cropContainer: {
      position: "relative",
      width: "100%",
      height: "30rem",
    },
    image: {
      objectFit: "cover",
    },
  }));

  const { classes } = useStyles();

  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);
  };
  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    if (!previewImage) return;
    try {
      const blob = await getCroppedImg(previewImage, croppedAreaPixels);
      if (!blob) return;

      const file = new File([blob], "Cropped image");
      const b = new Blob([blob as BlobPart]);

      const formData = new FormData();
      formData.append("image", file);
      props.onCropComplete(formData);
      // I will keep this for debugging just in case
      //setCroppedImage(URL.createObjectURL(b) as string);
      setPreviewImage(undefined);

      updateProfile(formData)
        .then(() => {
          setImage(URL.createObjectURL(b) as string);
        })
        .catch((err) => {
          setProfileFailOpen(true);
        });
    } catch (error) {
      setProfileFailOpen(true);
      console.error("Error cropping image " + error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="pb-5 text-xl font-semibold text-center">
        Profile Image:
      </div>
      <Modal
        centered
        closeOnClickOutside={false}
        opened={!!previewImage}
        onClose={() => setPreviewImage(undefined)}
        size="xl"
      >
        <Box className={classes.cropContainer}>
          <EasyCrop
            zoomWithScroll
            cropShape="round"
            aspect={1}
            objectFit="horizontal-cover"
            crop={crop}
            image={previewImage}
            zoom={zoom}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            // disableAutomaticStylesInjection
          />
        </Box>
        <Divider my="md" />
        <Stack spacing="xs">
          <Slider
            label={`Zoom: ${zoom}`}
            min={1}
            max={100}
            value={zoom}
            onChange={setZoom}
          />
          <button onClick={cropImage}>Crop image</button>
        </Stack>
      </Modal>
      <div className="flex justify-center">
        <img className="w-48 h-48" src={image}></img>
      </div>
      <div className="flex justify-center">
        <FileInput
          variant="filled"
          className="w-48"
          placeholder="Upload Profile Photo"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
      <input
        className="w-48 border-b-2 outline-none border-b-lgrey"
        type="text"
        placeholder="Enter Profile URL"
        value={ImgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <div className="flex justify-center pt-2">
        <button
          className="px-2 py-1 text-center rounded-lg w-fit bg-sky-300 drop-shadow-lg"
          onClick={async () => {
            await updateProfileURL(ImgUrl)
              .then(async () => {
                await Session.setUser(await fetchUser());
                setImage(ImgUrl);
              })
              .catch((err) => {
                setProfileFailOpen(true);
              });
          }}
        >
          Update Profile URL
        </button>
      </div>

      <FailPopUp
        open={profileFailOpen}
        setOpen={setProfileFailOpen}
        failText={PROFILE_ERR_MSG}
      />
    </div>
  );
};

export default ProfileImgCropper;
