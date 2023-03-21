// This file was heavily inspired by react-image-crop-demo linked here https://github.com/optimus-prime343/react-image-crop-demo

import { useState, useRef, useEffect } from "react";
import { Box, FileInput, Divider, Modal, Slider, Stack } from "@mantine/core";
import { createStyles } from "@mantine/styles";
import EasyCrop from "react-easy-crop";
import type { Point, Area } from "react-easy-crop/types";
import {
  updateProfile,
  updateBackground,
  updateProfileURL,
  updateBackgroundURL,
} from "../services/send-image";

import { getCroppedImg } from "../utils/crop-image";
import fetchUser from "../services/user/fetch-user";
import Session from "../session";

export interface ReactImageCropperProps {
  onCropComplete: (formData: FormData) => void;
}
export const ProfileImgCropper = (props: ReactImageCropperProps) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<
    Area | undefined
  >();

  const [image, setImage] = useState("");
  const [ImgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    const user = Session.getUser();
    if (user) {
      setImage(user.profileImgUrl);
    }
  }, [Session.getUser()]);

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

      updateProfile(formData).then(() => {
        setImage(URL.createObjectURL(b) as string);
      });
    } catch (error) {
      console.error("Error cropping image " + error);
    }
  };

  return (
    <>
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
      <img src={image}></img>
      {/* {croppedImage ? (
        <Stack align="center" justify="center" sx={{ minHeight: "100vh" }}>
          <Title>Cropped Image</Title>
          <Image
            width={400}
            height={400}
            src={croppedImage}
            alt="cropped result"
          />
          <Button onClick={() => setCroppedImage(undefined)}>
            Crop another image
          </Button>
        </Stack>
      ) : ( */}
      <Box className={classes.container}>
        <FileInput
          variant="filled"
          placeholder="Upload Profile Photo"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </Box>
      <input
        className="e-input"
        type="text"
        placeholder="Enter Profile Photo URL"
        value={ImgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <button
        onClick={async () => {
          await updateProfileURL(ImgUrl).then(async () => {
            await Session.setUser(await fetchUser());
          });
        }}
      >
        Update Profile URL
      </button>
    </>
  );
};

export interface BackgroundImgCropperProps {
  onCropComplete: (formData: FormData) => void;
}
export const BackgroundImgCropper = (props: BackgroundImgCropperProps) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<
    Area | undefined
  >();

  const [image, setImage] = useState("");

  const [ImgUrl, setImgUrl] = useState<string>("");

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

      updateBackground(formData).then(() => {
        setImage(URL.createObjectURL(b) as string);
      });
    } catch (error) {
      console.error("Error cropping image " + error);
    }
  };

  useEffect(() => {
    const user = Session.getUser();
    if (user) {
      setImage(user.backgroundImgUrl);
    }
  }, [Session.getUser()]);

  return (
    <>
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
            cropShape="rect"
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
      <img src={image}></img>
      {/* {croppedImage ? (
        <Stack align="center" justify="center" sx={{ minHeight: "100vh" }}>
          <Title>Cropped Image</Title>
          <Image
            width={400}
            height={400}
            src={croppedImage}
            alt="cropped result"
          />
          <Button onClick={() => setCroppedImage(undefined)}>
            Crop another image
          </Button>
        </Stack>
      ) : ( */}
      <Box className={classes.container}>
        <FileInput
          variant="filled"
          placeholder="Upload Background Photo"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </Box>

      <input
        className="e-input"
        type="text"
        placeholder="Enter Background Photo URL"
        value={ImgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <button
        onClick={async () => {
          await updateBackgroundURL(ImgUrl)
            .then(async () => {
              await Session.setUser(await fetchUser());
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        Update Background URL
      </button>
      {/*)}*/}
    </>
  );
};
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
