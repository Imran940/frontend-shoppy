import React from "react";
import Resizer from "react-image-file-resizer";
import { removeImages, uploadImages } from "../../functions/product";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
function ImageUploadForm({ formData, setFormData, setLoading }) {
  const { user } = useSelector((state) => ({ ...state }));
  let token = user.token;
  let imageArray = [];
  const handleChange = (e) => {
    let files = e.target.files;
    setLoading(true);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            uploadImages(token, uri)
              .then((resp) => {
                console.log(resp);
                imageArray.push(resp.data);
                setFormData((oldFormData) => ({
                  ...oldFormData,
                  images: imageArray,
                }));
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleRemove = (id) => {
    console.log("remove icon clicked");
    setLoading(true);
    removeImages(token, id)
      .then((resp) => {
        console.log(resp);
        const filterImages = formData.images.filter((i) => i.public_id !== id);
        setFormData((oldFormData) => ({
          ...oldFormData,
          images: filterImages,
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        {formData.images &&
          formData.images.map((image) => (
            <Badge
              style={{ cursor: "pointer" }}
              count="X"
              key={image.public_id}
              onClick={() => handleRemove(image.public_id)}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row mt-3 mb-3">
        <label className="btn btn-primary btn-raised">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={handleChange}
          />
        </label>
      </div>
    </>
  );
}

export default ImageUploadForm;
