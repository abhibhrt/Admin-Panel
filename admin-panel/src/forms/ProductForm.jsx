import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import api from "../utils/axios";
import ImageUploader from "../utils/ImageUploader";
import { updateProductData, addProductData  } from "../redux/private/productSlice";
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
    images: [],
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (!isCreate && productData) {
      setFormData({
        title: productData.title || "",
        description: productData.description || "",
        price: productData.price?.toString() || "",
        discount: productData.discount?.toString() || "",
        stock: productData.stock?.toString() || "",
        images: productData.images || [],
      });
    }
  }, [isCreate, productData]);

  // Handle text/number input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number" && value !== "" && Number(value) < 0) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image updates from ImageUploader
  const handleImages = (images) => {
    console.log(images)
    setFormData((prev) => ({ ...prev, images }));
  };

  const submitNow = async (data) => {
    try {
      setLoading(true)
      if (isCreate) {
        await api.post("/products", data);
        dispatch(addProductData(data))
      } else {
        await api.put(`/products/${productData.id}`, data);
        dispatch(updateProductData({id: productData.id, updates: data}));
      }
      setLoading(false)
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
        images: [],
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
            type="text"
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
            type="text"
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
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            className="product-form-input"
            min="0"
            required
          />
        </div>

        <div className="product-form-group">
          <ImageUploader
            imagesEdit={!isCreate ? productData.images : []}
            handleImages={handleImages}
          />
        </div>

        <button type="submit" className="product-form-submit-btn" disabled={loading}>
          {loading? "Please Wait..." :(isCreate ? "Create Product" : "Update Product")}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
