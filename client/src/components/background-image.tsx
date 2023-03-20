import React, { useState } from "react";

const BImg = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            className=""
            alt="not found"
            height={100}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>
            Remove Background Image
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

export default BImg;
