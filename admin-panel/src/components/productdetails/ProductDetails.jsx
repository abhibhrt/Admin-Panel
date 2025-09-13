import React, { useState } from "react";
import "./ProductDetails.css";

const ProductDetails = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return <p className="product-details-empty">Product not found.</p>;

  const images = product.images || [];

  return (
    <div className="product-details-container">
      <span className="auth-close-cross" onClick={onClose}>✖</span>
      <div className="product-details-image-section">
        {images.length > 0 ? (
          <>
            <img
              src={images[selectedImage].url}
              alt={`Product ${selectedImage + 1}`}
              className="product-details-main-image"
            />
            <div className="product-details-thumbnail-list">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`product-details-thumbnail ${index === selectedImage ? "active" : ""
                    }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="product-details-no-image">No images available</div>
        )}
      </div>

      {/* Info Section */}
      <div className="product-details-info-section">
        <div className="product-details-header">
          <h2 className="product-details-title">{product.title}</h2>
        </div>

        <p className="product-details-description">
          {product.description || "No description"}
        </p>

        {/* Price Section */}
        <div className="product-details-price-container">
          <span className="product-details-price">₹{product.price}</span>
          {product.discount > 0 && (
            <>
              <span className="product-details-price-original">
                ₹{(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="product-details-discount">{product.discount}% OFF</span>
            </>
          )}
        </div>

        {/* Stock */}
        <div
          className={`product-details-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"
            }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </div>

        {/* Additional Info */}
        <div className="product-details-meta">
          <p><strong>Sizes:</strong> {product.sizes}</p>
          <p><strong>Delivery:</strong> {product.delivery} days</p>
          <p><strong>Shipping Charge:</strong> ₹{product.shipCharge}</p>
          <p><strong>Returnable:</strong> {product.returnable} days</p>
          <p className="product-details-createdAt">
            Created At: {new Date(product.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Highlights */}
        <div className="product-details-highlights">
          <h3>Highlights</h3>
          {product.highlights && product.highlights.length > 0 ? (
            <ul>
              {product.highlights.map((hl, index) => (
                <li key={index}>
                  <strong>{hl.key}:</strong> {hl.value}
                </li>
              ))}
            </ul>
          ) : (
            <p>No highlights available</p>
          )}
        </div>

        {/* Reviews */}
        <div className="product-details-reviews">
          <h3>Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <ul>
              {product.reviews.map((review, index) => (
                <li key={index}>
                  <p><strong>User:</strong> {review.user?.name || "Anonymous"}</p>
                  <p><strong>Rating:</strong> {review.rating}/5</p>
                  <p>{review.feedback}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>

        {/* Orders */}
        <div className="product-details-orders">
          <h3>Orders</h3>
          {product.orders && product.orders.length > 0 ? (
            <ul>
              {product.orders.map((order, index) => (
                <li key={index}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet</p>
          )}
        </div>

        {/* Cart Items */}
        <div className="product-details-cart">
          <h3>Cart Items</h3>
          {product.cartItems && product.cartItems.length > 0 ? (
            <ul>
              {product.cartItems.map((cart, index) => (
                <li key={index}>
                  <p><strong>Cart ID:</strong> {cart.id}</p>
                  <p><strong>Quantity:</strong> {cart.quantity}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No cart items</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
