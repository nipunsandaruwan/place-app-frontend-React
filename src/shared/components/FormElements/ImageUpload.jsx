import React, { useRef, useState, useEffect } from "react";
import "./imageUpload.css";

const ImageUpload = (props) => {
  const filePicker = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  ////////handle change in file upload
  const pickHandler = (event) => {
    // console.log(event.target);
    let pickedFile;
    let fileIsValid = true;
    if (event.target.files || event.targetfiles.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePicker.current.click();
  };
  return (
    <div className="form-control">
      <input
        type="file"
        ref={filePicker}
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
        onChange={pickHandler}
      />
      <div className="image-upload">
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please Pick an Image</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          Pick Profile Pic
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
