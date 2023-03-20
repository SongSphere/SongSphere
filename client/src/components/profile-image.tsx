import { useState } from "react";

const PImg = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            className="h-auto max-w-full align-middle border-none rounded-full shadow-lg"
            alt="not found"
            width={"150px"}
            height={"150px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>
            Remove Profile Image
          </button>
        </div>
      )}

      <br />
      <br />

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          if (!event.target.files || event.target.files.length === 0) {
            return;
          }

          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default PImg;
