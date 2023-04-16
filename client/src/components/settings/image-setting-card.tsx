import BgImgCropper from "./bg-img-cropper";
import ProfileImgCropper from "./profile-img-cropper";

const ImageSettingCard = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="bg-white rounded-lg">
        <h3 className="pt-10 text-3xl font-semibold text-center">
          Image Settings
        </h3>
        <div className="grid grid-cols-2 gap-2 p-4 place-items-center">
          <BgImgCropper onCropComplete={console.log} />
          <ProfileImgCropper onCropComplete={console.log} />
        </div>
      </div>
    </div>
  );
};

export default ImageSettingCard;
