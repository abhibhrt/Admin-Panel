import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import api from "../../utils/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const statusOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];

  // ✅ Fetch Orders
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

  // ✅ Update Order Status
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5001/api/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      // Show success notification
      showNotification(`Order status updated to ${newStatus}`, "success");
      
      // Update local state without refetching
      setOrders(orders.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
      ));
    } catch (error) {
      console.error("Error updating status", error);
      showNotification("Failed to update order status", "error");
    }
  };

  // Filter orders by status
  const filteredOrders = filterStatus === "All" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  // Show notification
  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">Order Management</h1>
          <div className="header-actions">
            <div className="filter-dropdown skeleton"></div>
            <div className="search-bar skeleton"></div>
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div className="header-content">
          <h1 className="orders-title">Order Management</h1>
          <p className="orders-subtitle">Manage and track customer orders</p>
        </div>
        
        <div className="header-actions">
          <div className="filter-group">
            <label htmlFor="status-filter" className="filter-label">Filter by status:</label>
            <select 
              id="status-filter"
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Orders</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div className="search-group">
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="search-input"
            />
            <button className="search-btn">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="orders-content">
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon total">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-value">{orders.length}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon pending">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-value">{orders.filter(o => o.status === "Pending").length}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon shipped">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17L12 20L21 11M19.5 5.5C19.5 6.88071 18.3807 8 17 8C15.6193 8 14.5 6.88071 14.5 5.5C14.5 4.11929 15.6193 3 17 3C18.3807 3 19.5 4.11929 19.5 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-value">{orders.filter(o => o.status === "Shipped").length}</div>
              <div className="stat-label">Shipped</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon delivered">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-info">
              <div className="stat-value">{orders.filter(o => o.status === "Delivered").length}</div>
              <div className="stat-label">Delivered</div>
            </div>
          </div>
        </div>

        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th className="order-id">Order ID</th>
                <th className="customer">Customer</th>
                <th className="product">Product</th>
                <th className="date">Order Date</th>
                <th className="amount">Amount</th>
                <th className="status">Status</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-orders">
                    <div className="no-orders-content">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p>No orders found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, index) => (
                  <tr key={order.id} className="order-row">
                    <td className="order-id">#{order.id || index + 1}</td>
                    <td className="customer">
                      <div className="customer-info">
                        <div className="customer-name">{order.user?.name || "N/A"}</div>
                        <div className="customer-email">{order.user?.email || "N/A"}</div>
                      </div>
                    </td>
                    <td className="product">
                      <div className="product-info">
                        <div className="product-name">{order.product?.title || "N/A"}</div>
                        <div className="product-category">{order.product?.category || "General"}</div>
                      </div>
                    </td>
                    <td className="date">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="amount">${order.totalAmount || "0.00"}</td>
                    <td className="status">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`status-select ${order.status.toLowerCase()}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
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