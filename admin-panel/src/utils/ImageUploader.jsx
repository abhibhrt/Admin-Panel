import React, { useRef, useState } from "react";

export default function ImageUploader({
  value = "",
  onChange = () => {},
  cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset = import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET,
  folder = import.meta.env.VITE_CLOUDINARY_FOLDER || undefined,
  maxSizeMB = 5,
  accept = "image/*",
  className = "",
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const inputRef = useRef(null);

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const clearImage = () => {
    onChange("");
    resetInput();
    setErr("");
  };

  const handleFile = async (e) => {
    setErr("");
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!cloudName || !uploadPreset) {
      setErr("Cloudinary config missing: cloudName / uploadPreset.");
      resetInput();
      return;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setErr(`File too large. Max ${maxSizeMB} MB allowed.`);
      resetInput();
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", uploadPreset);
    if (folder) fd.append("folder", folder);

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: fd }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Upload failed");
      }
      if (!data?.secure_url) {
        throw new Error("No secure_url returned from Cloudinary");
      }

      onChange(data.secure_url);
    } catch (e2) {
      console.error("Cloudinary upload error:", e2);
      setErr(e2.message || "Upload error");
      resetInput();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`image-uploader ${className}`}>
      {value ? (
        <div className="uploaded-image-preview">
          <img src={value} alt="Uploaded" className="preview-img" />
          <button
            type="button"
            className="clear-btn"
            onClick={clearImage}
            aria-label="Remove image"
            title="Remove image"
          >
            ✖
          </button>
        </div>
      ) : (
        <div className="upload-box">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFile}
            disabled={loading}
          />
          {loading && <p className="uploading-text">Uploading…</p>}
        </div>
      )}
      {err && <p className="error-text">{err}</p>}
    </div>
  );
}
