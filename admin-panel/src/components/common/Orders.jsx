import React, { useState } from "react";
import "./common.css";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderData } from "../../redux/private/orderSlice";
import api from "../../utils/axios";
import UserDetails from "../userdetails/UserDetails";
import ProductDetails from "../productdetails/ProductDetails";

const Orders = () => {
  const orders = useSelector((state) => state.order.data) || [];
  const [filterStatus, setFilterStatus] = useState("All");
  const dispatch = useDispatch();
  const [viewItem, setViewItem] = useState(null);

  if (viewItem) {
    return viewItem.type === "user" ? <UserDetails user={viewItem.data} onClose={() => setViewItem(null)} /> : <ProductDetails product={viewItem.data} onClose={() => setViewItem(null)} />;
  }

  const statusOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];
  const updateStatus = async (orderId, newStatus) => {
    dispatch(updateOrderData({ id: orderId, updates: { status: newStatus } }));
    try {
      const res = await api.put(`/orders/${orderId}/status`,
        { status: newStatus }
      );
      dispatch(updateOrderData({ id: orderId, updates: { status: res.data.status } }));
    } catch (error) {
      dispatch(updateOrderData({ id: orderId, updates: { status: "Pending" } }));
    }
  };

  const filteredOrders =
    filterStatus === "All" ? orders : orders.filter((order) => order.status === filterStatus);

  return (
    <div className="customer-order-container">
      <div className="customer-order-header">
        <div className="customer-order-filter-group">
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
      </div>

      <div className="customer-order-table-container">
        <table className="customer-order-table">
          <thead>
            <tr>
              <th className="customer-order-table-id">Order ID</th>
              <th className="customer-order-table-quantity">Quantity</th>
              <th className="customer-order-table-customer">Customer</th>
              <th className="customer-order-table-product">Product</th>
              <th className="customer-order-table-date">Order Date</th>
              <th className="customer-order-expected-date">Expected Date</th>
              <th className="customer-order-table-amount">Amount</th>
              <th className="customer-order-table-payment-mode">Payment Mode</th>
              <th className="customer-order-table-status">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="customer-order-no-data">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr key={order.id} className="customer-order-row">
                  <td className="customer-order-table-id">{order.id || index + 1}</td>
                  <td className="customer-order-table-quantity">{order.quantity || 1}</td>
                  <td className="customer-order-table-customer">
                    <div className="customer-order-customer-info">
                      <div className="customer-order-customer-name">
                        <button className="common-btn-1 success"
                          onClick={() => setViewItem({ type: "user", data: order.user })}>
                          User View
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="customer-order-table-product">
                    <div className="customer-order-product-info">
                      <div className="customer-order-product-name">
                        <button className="common-btn-1"
                        onClick={() => setViewItem({ type: "product", data: order.product })}>
                          Product View
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="customer-order-table-date">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="customer-order-expected-date">{new Date(order.expected).toLocaleDateString()}</td>
                  <td className="customer-order-table-amount">₹{order.total || "0.00"}</td>
                  <td className="customer-order-table-payment-mode">{order.paymentMode || "N/A"}</td>
                  <td className="customer-order-table-status">
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;