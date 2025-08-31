import React from "react";
import "./ProductDetails.css";
import ProductForm from "../../forms/ProductForm";

const ProductDetails = ({ product, onClose }) => {
  const [close, setClose] = React.useState(true);

  if(!close){
    return (
      <ProductForm isCreate={false} productData={product} onClose={() => setClose(true)} />
    )
  }

  if (!product) return <div className="product-details-empty">No product details available</div>;

  const { title, description, price, discount, stock, createdAt, images } = product;

  const primaryImage = images?.find((img) => img.isPrimary) || images?.[0];

  return (
    <div className="product-details-container">
      {/* Image Section */}
      <span onClick={onClose} className="auth-close-cross">✖</span>
      <div className="product-details-image-section">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={title}
            className="product-details-main-image"
          />
        ) : (
          <div className="product-details-no-image">No Image Available</div>
        )}
        <div className="product-details-thumbnail-list">
          {images?.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt={`${title}-${img.id}`}
              className={`product-details-thumbnail ${img.isPrimary ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="product-details-info-section">
        <h1 className="product-details-title">{title}</h1>
        <p className="product-details-description">{description}</p>

        <div className="product-details-price-container">
          {discount > 0 ? (
            <>
              <span className="product-details-price-discounted">
                ₹{(price - (price * discount) / 100).toFixed(2)}
              </span>
              <span className="product-details-price-original">₹{price}</span>
              <span className="product-details-discount">-{discount}%</span>
            </>
          ) : (
            <span className="product-details-price">₹{price}</span>
          )}
        </div>

        <div className={`product-details-stock ${stock > 0 ? "in-stock" : "out-of-stock"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </div>

        <div className="product-details-meta">
          <p className="product-details-createdAt">
            Added on: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <button className="product-details-add-to-cart-btn" onClick={() => setClose(false)}>Edit Product</button>
      </div>
    </div>
  );
};

export default ProductDetails;