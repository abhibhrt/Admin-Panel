import React, { useState } from "react";
// import "./common.css";
import { useSelector, useDispatch } from "react-redux";
import { clearProductData, updateProductData } from "../../redux/private/productSlice";
import api from "../../utils/axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ProductForm from "../../forms/ProductForm";

const Products = () => {
  const products = useSelector((state) => state.product.data) || [];
  const dispatch = useDispatch();
  const [close, setClose] = useState(true);
  const [search, setSearch] = useState("");
  const [operation, setOperation] = useState({
    operate: false,
    isEdit: false,
    product: null,
  });

  if (!close) {
    return (
      <ProductForm
        isCreate={!operation.isEdit}
        productData={operation.product}
        onClose={() => setClose(true)}
      />
    );
  }

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${productId}`);
      //   dispatch(clearProductData());
    } catch (error) {
      alert("Failed to delete product!");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customer-product-container">
      <div className="customer-product-header">
        <div className="customer-product-actions">
          <button className="customer-product-add-btn" title="Add Product" onClick={() => {setOperation({ operate: true, isEdit: false, product: null }); setClose(false);}}>
            <FaPlus />
          </button>
        </div>
        <div className="customer-product-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="customer-product-search-input"
          />
        </div>
      </div>

      <div className="customer-product-table-container">
        <table className="customer-product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="customer-product-no-data">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={product.id} className="customer-product-row">
                  <td>{product.id || index + 1}</td>
                  <td>
                    <img
                      src={
                        product.images?.find((img) => img.isPrimary)?.url ||
                        "https://via.placeholder.com/50"
                      }
                      alt={product.title}
                      className="customer-product-thumbnail"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                  <td className="customer-product-actions">
                    <button
                      className="common-btn-1 info"
                      onClick={() => {setOperation({ operate: true, isEdit: true, product }); setClose(false);}}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="common-btn-1 error"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
