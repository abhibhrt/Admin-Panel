import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import api from "../utils/axios";
import ImageUploader from "../utils/ImageUploader";

const ProductForm = ({ isCreate = true, productData = {}, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    images: [{ url: "", isPrimary: false }],
  });

  // Pre-fill for editing
  useEffect(() => {
    if (!isCreate && productData) {
      setFormData({
        title: productData.title || "",
        description: productData.description || "",
        price: productData.price?.toString() || "",
        discount: productData.discount?.toString() || "",
        stock: productData.stock?.toString() || "",
        images:
          productData.images?.length > 0
            ? productData.images.map((img) => ({
                url: img.url || "",
                isPrimary: img.isPrimary || false,
              }))
            : [{ url: "", isPrimary: false }],
      });
    }
  }, [isCreate, productData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number" && value !== "" && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index][field] = value;
      return { ...prev, images: updatedImages };
    });
  };

  // Add image slot
  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", isPrimary: false }],
    }));
  };

  // Remove image slot
  const removeImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  const submitNow = async (data) => {
    try {
      if (!isCreate) {
        await api.put(`/products/${productData.id}`, data);
      } else {
        await api.post("/products", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setFormData({
      title: "",
      description: "",
      price: "",
      discount: "",
      stock: "",
      images: [{ url: "", isPrimary: false }],
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      discount: parseInt(formData.discount) || 0,
      stock: parseInt(formData.stock) || 0,
    };
    submitNow(finalData);
  };

  return (
    <div className="product-form-container">
      <h2 className="product-form-title">
        {isCreate ? "Add New Product" : "Edit Product"}
      </h2>

      <form onSubmit={handleSubmit} className="product-form">
        <span onClick={onClose} className="auth-close-cross">✖</span>
        <div className="product-form-group">
          <label className="product-form-label">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            className="product-form-input"
            required
          />
        </div>

        <div className="product-form-group">
          <label className="product-form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="product-form-textarea"
          />
        </div>

        <div className="product-form-group">
          <label className="product-form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="product-form-input"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="product-form-group">
          <label className="product-form-label">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount"
            className="product-form-input"
            min="0"
            max="100"
          />
        </div>

        <div className="product-form-group">
          <label className="product-form-label">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            className="product-form-input"
            min="0"
            required
          />
        </div>

        {/* 🔥 Image Upload Section */}
        <div className="product-form-group">
          <label className="product-form-label">Images</label>
          {formData.images.map((img, index) => (
            <div key={index} className="product-form-image-group">
              <ImageUploader
                value={img.url}
                onChange={(newUrl) => handleImageChange(index, "url", newUrl)}
              />
              <label className="product-form-checkbox-label">
                <input
                  type="checkbox"
                  checked={img.isPrimary}
                  onChange={(e) =>
                    handleImageChange(index, "isPrimary", e.target.checked)
                  }
                  className="product-form-checkbox"
                />
                Primary
              </label>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="product-form-delete-btn"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImage}
            className="product-form-add-btn"
          >
            + Add Image
          </button>
        </div>

        <button type="submit" className="product-form-submit-btn">
          {isCreate ? "Create Product" : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
