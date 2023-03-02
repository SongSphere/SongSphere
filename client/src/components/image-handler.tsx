// This file was heavily inspired by react-image-crop-demo linked here https://github.com/optimus-prime343/react-image-crop-demo

import { useState, useRef } from "react";
import {
  Box,
  FileInput,
  Divider,
  Modal,
  Slider,
  Button,
  Stack,
  Text,
  Image,
  Title,
} from "@mantine/core";
import { createStyles } from "@mantine/styles";
import EasyCrop from "react-easy-crop";
import type { Point, Area } from "react-easy-crop/types";
import updateProfile from "../services/send-image";

import { getCroppedImg } from "../utils/crop-image";

export interface ReactImageCropperProps {
  onCropComplete: (formData: FormData) => void;
}
export const ReactImageCropper = ({
  onCropComplete,
}: ReactImageCropperProps) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<
    Area | undefined
  >();

  const [imageName, setImageName] = useState();

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
      console.log("THIS IS BLOB");
      console.log(blob);
      if (!blob) return;

      const file = new File([blob], "Cropped image");
      console.log(file);
      const b = new Blob([blob as BlobPart]);
      // let b2 = await fetch(blob).then(r => r.blob());
      // console.log(URL.createObjectURL(b2));

      const formData = new FormData();
      formData.append("image", file);
      const ds = " hello ";
      formData.append("Description", ds);
      onCropComplete(formData);
      setCroppedImage(URL.createObjectURL(b) as string);
      setPreviewImage(undefined);

      console.log("Blob");
      console.log(b);

      console.log(formData);
      updateProfile(formData);

      //const arrayBuffer = await blob["arrayBuffer"]();
      // await new Response(b).arrayBuffer().then((arrayBuffer) => {
      //   console.log("arrayBuffer");
      //   console.log(arrayBuffer);
      //   //const buffer = Buffer.from(arrayBuffer);
      //   updateProfile(arrayBuffer);
      // });
    } catch (error) {
      console.log("Error cropping image " + error);
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
          <Button onClick={cropImage}>Crop image</Button>
        </Stack>
      </Modal>
      {croppedImage ? (
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
      ) : (
        <Box className={classes.container}>
          <FileInput
            variant="filled"
            placeholder="Upload Profile Photo"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Box>
      )}
    </>
  );
};
const useStyles = createStyles(() => ({
  container: {
    minHeight: "100vh",
    display: "flex",
  },
  cropContainer: {
    position: "relative",
    width: "100%",
    height: "30rem",
  },
  croppedImageContainer: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    objectFit: "cover",
  },
}));