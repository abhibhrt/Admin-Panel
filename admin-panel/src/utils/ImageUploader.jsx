import React, { useState } from "react";
import api from "./axios";

export default function ImageUploader({ imagesEdit = [], handleImages }) {
  const [loading, setLoading] = useState(null);
  const [images, setImages] = useState(imagesEdit);
  const [err, setErr] = useState(null);

  const uploadImage = async (rawFile) => {
    if (!rawFile) return;
    setLoading("Uploading...");
    setErr(null);

    try {
      const formData = new FormData();
      formData.append("file", rawFile);

      const res = await api.post("/products/images/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Upload failed");
      }

      const newImage = {
        url: res.data.url,
        isPrimary: images.length===0,
        publicId: res.data.publicId,
      };

      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      handleImages?.(updatedImages);
      
    } catch (error) {
      console.error(error);
      setErr(error.message || "Upload failed");
    } finally {
      setLoading(null);
    }
  };

  const deleteImage = async (publicId) => {
    setLoading("Deleting...");
    setErr(null);

    try {
      const res = await api.post("/products/images/delete-image", { id: publicId });

      if (!res.data?.success && !res.data?.message?.includes("deleted")) {
        throw new Error(res.data?.message || "Delete failed");
      }

      const updatedImages = images.filter((img) => img.publicId !== publicId);
      setImages(updatedImages);
      handleImages?.(updatedImages);
    } catch (error) {
      console.error(error);
      setErr(error.message || "Delete failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="image-uploader">
      <div className="uploaded-image-list">
        {images && images.map((img) => (
          <div key={img.publicId} className="uploaded-image-preview">
            <img src={img.url} alt="Uploaded" className="preview-img" />
            <button
              type="button"
              className="image-clear-btn"
              onClick={() => deleteImage(img.publicId)}
              disabled={loading}
              aria-label="Remove image"
              title="Remove image"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <div className="upload-box">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e.target.files[0])}
          disabled={loading}
        />
      </div>

      {err && <p className="error-text">{err}</p>}
      {loading && <p className="uploading-text">{loading}</p>}
    </div>
  );
}
