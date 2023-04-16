import DeleteGoogleAcountLink from "./delete-google-account-link";

const DangerZone = () => {
  return (
    <div>
      <div className="w-full h-full p-4">
        <div className="pb-10 bg-white rounded-lg">
          <h3 className="pt-10 text-3xl font-semibold text-center">
            Danger Zone!
          </h3>
          <div className="flex justify-center p-4">
            <DeleteGoogleAcountLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
