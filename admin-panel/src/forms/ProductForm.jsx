import React, { useState, useEffect } from "react";
import "./ProductForm.css";

const ProductForm = ({ isCreate = true, productData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    images: [{ url: "", publicId: "", isPrimary: false }],
  });

  // 🔹 Set data if editing
  useEffect(() => {
  if (!isCreate && productData) {
    setFormData({
      title: productData.title || "",
      description: productData.description || "",
      price: productData.price || "",
      discount: productData.discount || "",
      stock: productData.stock || "",
      images:
        productData.images && productData.images.length > 0
          ? productData.images.map((img) => ({
              url: img.url || "",
              publicId: img.publicId || "",
              isPrimary: img.isPrimary || false,
            }))
          : [{ url: "", publicId: "", isPrimary: false }],
    });
  }
}, [isCreate, productData]);


  // 🔹 Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle Image Change
  const handleImageChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index][field] =
        field === "isPrimary" ? !updatedImages[index][field] : value;
      return { ...prev, images: updatedImages };
    });
  };

  // 🔹 Add/Remove Images
  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", publicId: "", isPrimary: false }],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  // 🔹 Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

  };

  return (
    <div className="product-form-container">
      <h2 className="product-form-title">
        {isCreate ? "Add New Product" : "Edit Product"}
      </h2>

      <form onSubmit={handleSubmit} className="product-form">
        {/* Title */}
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

        {/* Description */}
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

        {/* Price */}
        <div className="product-form-group">
          <label className="product-form-label">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="product-form-input"
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* Discount */}
        <div className="product-form-group">
          <label className="product-form-label">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="product-form-input"
            min="0"
            max="100"
          />
        </div>

        {/* Stock */}
        <div className="product-form-group">
          <label className="product-form-label">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="product-form-input"
            min="0"
            required
          />
        </div>

        {/* Images */}
        <div className="product-form-group">
          <label className="product-form-label">Images</label>
          {formData.images.map((img, index) => (
            <div key={index} className="product-form-image-group">
              <div className="product-form-image-row">
                <input
                  type="text"
                  value={img.url}
                  onChange={(e) =>
                    handleImageChange(index, "url", e.target.value)
                  }
                  placeholder="Image URL"
                  className="product-form-input product-form-image-input"
                />
                <input
                  type="text"
                  value={img.publicId}
                  onChange={(e) =>
                    handleImageChange(index, "publicId", e.target.value)
                  }
                  placeholder="Public ID"
                  className="product-form-input product-form-image-input"
                />
                <label className="product-form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={img.isPrimary}
                    onChange={() => handleImageChange(index, "isPrimary")}
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