import { useState } from "react";

export const PreviewImage = (file) => {
  const [preview, setPreview] = useState();
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div>
      <img
        src={preview}
        // alt="image Broken"
        style={{ width: "150px", height: "150px" }}
      />
    </div>
  );
};
