import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaFilter, FaSearch } from "react-icons/fa"; // Example icons
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const statusOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/orders", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5001/api/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      showNotification(`Order status updated to ${newStatus}`, "success");
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
      showNotification("Failed to update order status", "error");
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `customer-order-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="customer-order-container">
        <div className="customer-order-header">
          <h1 className="customer-order-title">Order Management</h1>
          <div className="customer-order-header-actions">
            <div className="customer-order-filter-dropdown skeleton"></div>
            <div className="customer-order-search-bar skeleton"></div>
          </div>
        </div>
        <div className="customer-order-loading-container">
          <div className="customer-order-loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-order-container">
      <div className="customer-order-header">
        <div className="customer-order-header-content">
          <h1 className="customer-order-title">Order Management</h1>
          <p className="customer-order-subtitle">
            Manage and track customer orders
          </p>
        </div>

        <div className="customer-order-header-actions">
          <div className="customer-order-filter-group">
            <label
              htmlFor="status-filter"
              className="customer-order-filter-label"
            >
              Filter by status:
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="customer-order-filter-select"
            >
              <option value="All">All Orders</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="customer-order-search-group">
            <input
              type="text"
              placeholder="Search orders..."
              className="customer-order-search-input"
            />
            <button className="customer-order-search-btn">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="customer-order-content">
        <div className="customer-order-stats-cards">
          <div className="customer-order-stat-card">
            <div className="customer-order-stat-icon total">
              {/* SVG kept as example */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="customer-order-stat-info">
              <div className="customer-order-stat-value">{orders.length}</div>
              <div className="customer-order-stat-label">Total Orders</div>
            </div>
          </div>

          {/* Pending, Shipped, Delivered cards similarly updated with classnames */}
        </div>

        <div className="customer-order-table-container">
          <table className="customer-order-table">
            <thead>
              <tr>
                <th className="customer-order-id">Order ID</th>
                <th className="customer-order-customer">Customer</th>
                <th className="customer-order-product">Product</th>
                <th className="customer-order-date">Order Date</th>
                <th className="customer-order-amount">Amount</th>
                <th className="customer-order-status">Status</th>
                <th className="customer-order-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="customer-order-no-orders">
                    <p>No orders found</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.id} className="customer-order-row">
                    <td className="customer-order-id">#{order.id || index + 1}</td>
                    <td className="customer-order-customer">
                      <div className="customer-order-customer-info">
                        <div className="customer-order-customer-name">{order.user?.name || "N/A"}</div>
                        <div className="customer-order-customer-email">{order.user?.email || "N/A"}</div>
                      </div>
                    </td>
                    <td className="customer-order-product">
                      <div className="customer-order-product-info">
                        <div className="customer-order-product-name">{order.product?.title || "N/A"}</div>
                        <div className="customer-order-product-category">{order.product?.category || "General"}</div>
                      </div>
                    </td>
                    <td className="customer-order-date">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="customer-order-amount">${order.totalAmount || "0.00"}</td>
                    <td className="customer-order-status">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`customer-order-status-select ${order.status.toLowerCase()}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="customer-order-actions">
                      <button
                        className="customer-order-action-btn view-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FaEye />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
