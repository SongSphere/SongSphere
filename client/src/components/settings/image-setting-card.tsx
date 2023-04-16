import { BackgroundImgCropper, ProfileImgCropper } from "./image-handler";

const ImageSettingCard = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg">
        <h3 className="pt-10 text-3xl font-semibold text-center">
          Image Settings
        </h3>
        <div className="grid grid-cols-2 gap-2 p-4 place-items-center">
          <BackgroundImgCropper onCropComplete={console.log} />
          <ProfileImgCropper onCropComplete={console.log} />
        </div>
      </div>
    </div>
  );
};

export default ImageSettingCard;
