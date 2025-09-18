import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import api from "../utils/axios";
import ImageUploader from "../utils/ImageUploader";
import { updateProductData, addProductData } from "../redux/private/productSlice";
import { useDispatch } from "react-redux";

const ProductForm = ({ isCreate = true, productData = {}, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    category: "",
    sizes: "",
    delivery: 7,
    shipCharge: 0,
    returnable: 0,
    images: [],
    highlights: [{ key: "", value: "" }],
  });

  // Pre-fill data if editing
  useEffect(() => {
    if (!isCreate && productData) {
      setFormData({
        title: productData.title || "",
        description: productData.description || "",
        price: productData.price?.toString() || "",
        discount: productData.discount?.toString() || "",
        stock: productData.stock?.toString() || "",
        category: productData.category || "general",
        sizes: productData.sizes || "S, M, L, XL",
        delivery: productData.delivery || 7,
        shipCharge: productData.shipCharge || 0,
        returnable: productData.returnable || 0,
        images: productData.images || [],
        highlights:
          productData.highlights?.length > 0
            ? productData.highlights
            : [{ key: "", value: "" }],
      });
    }
  }, [isCreate, productData]);

  // Handle field change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number" && value !== "" && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle images
  const handleImages = (images) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  // Handle highlight field change
  const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index][field] = value;
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlightRow = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, { key: "", value: "" }],
    }));
  };

  const removeHighlightRow = (index) => {
    const newHighlights = [...formData.highlights];
    newHighlights.splice(index, 1);
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  // Submit logic
  const submitNow = async (data) => {
    try {
      setLoading(true);
      if (isCreate) {
        await api.post("/products", data);
        dispatch(addProductData(data));
      } else {
        await api.put(`/products/${productData.id}`, data);
        dispatch(updateProductData({ id: productData.id, updates: data }));
      }
      setLoading(false);
      onClose?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setFormData({
        title: "",
        description: "",
        price: "",
        discount: "",
        stock: "",
        sizes: "S, M, L, XL",
        delivery: 7,
        shipCharge: 0,
        returnable: 0,
        images: [],
        highlights: [{ key: "", value: "" }],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      discount: parseInt(formData.discount) || 0,
      stock: parseInt(formData.stock) || 0,
      delivery: parseInt(formData.delivery) || 7,
      shipCharge: parseInt(formData.shipCharge) || 0,
      returnable: parseInt(formData.returnable) || 0,
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

        {/* Discount */}
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

        {/* Stock */}
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

        {/* Category */}
        <div className="product-form-group">
          <label className="product-form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="product-form-input"
          >
            <option value="general">General</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="kid/boy">Kid/Boy</option>
            <option value="kid/girl">Kid/Girl</option>
          </select>
        </div>

        {/* Sizes */}
        <div className="product-form-group">
          <label className="product-form-label">Sizes</label>
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleChange}
            placeholder="S, M, L, XL"
            className="product-form-input"
          />
        </div>

        {/* Delivery */}
        <div className="product-form-group">
          <label className="product-form-label">Delivery (days)</label>
          <input
            type="number"
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            className="product-form-input"
            min="0"
          />
        </div>

        {/* Shipping Charge */}
        <div className="product-form-group">
          <label className="product-form-label">Shipping Charge (₹)</label>
          <input
            type="number"
            name="shipCharge"
            value={formData.shipCharge}
            onChange={handleChange}
            className="product-form-input"
            min="0"
          />
        </div>

        {/* Returnable */}
        <div className="product-form-group">
          <label className="product-form-label">Returnable (days)</label>
          <input
            type="number"
            name="returnable"
            value={formData.returnable}
            onChange={handleChange}
            className="product-form-input"
            min="0"
          />
        </div>

        {/* Highlights */}
        <div className="product-form-group">
          <label className="product-form-label">Highlights</label>
          {formData.highlights.map((hl, index) => (
            <div key={index} className="highlight-row">
              <input
                type="text"
                placeholder="Key"
                value={hl.key}
                onChange={(e) => handleHighlightChange(index, "key", e.target.value)}
              />
              <input
                type="text"
                placeholder="Value"
                value={hl.value}
                onChange={(e) => handleHighlightChange(index, "value", e.target.value)}
              />
              {index > 0 && (
                <button type="button" onClick={() => removeHighlightRow(index)}>
                  ❌
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addHighlightRow}>+ Add Highlight</button>
        </div>

        {/* Image Uploader */}
        <div className="product-form-group">
          <ImageUploader
            imagesEdit={!isCreate ? productData.images : []}
            handleImages={handleImages}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="product-form-submit-btn" disabled={loading}>
          {loading ? "Please Wait..." : isCreate ? "Create Product" : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
