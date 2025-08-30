import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDetails from "../userdetails/UserDetails";
import "./common.css";

const User = () => {
  const users = useSelector((state) => state.user.data) || [];
  const [userDetails, setUserDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (userDetails) {
    return <UserDetails user={userDetails} />;
  }

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();

    const inAddress = user.address
      ? `${user.address.state || ""} ${user.address.city || ""} ${user.address.addressLine || ""} ${user.address.pincode || ""}`.toLowerCase()
      : "";

    const inOrders = user.orders
      ? user.orders.map((order) => order.product?.title || "").join(" ").toLowerCase()
      : "";

    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      inAddress.includes(searchLower) ||
      inOrders.includes(searchLower)
    );
  });

  return (
    <div className="customer-user-container">
      <div className="customer-user-header">
        <input
          type="text"
          placeholder="Search users, address, or orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="customer-user-search-input"
        />
      </div>

      <div className="customer-user-table-container">
        <table className="customer-user-table">
          <thead>
            <tr>
              <th className="customer-user-table-id">User Id</th>
              <th className="customer-user-table-name">Name</th>
              <th className="customer-user-table-email">Email</th>
              <th className="customer-user-table-orders">Orders</th>
              <th className="customer-user-table-actions">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id || index} className="customer-user-row">
                  <td className="customer-user-table-id">{index + 1}</td>
                  <td className="customer-user-table-name">{user.name}</td>
                  <td className="customer-user-table-email">{user.email}</td>
                  <td className="customer-user-table-orders">{user.orders?.length || 0}</td>
                  <td className="customer-user-table-actions">
                    <div className="customer-user-actions">
                      <button
                        className="common-btn-1 info"
                        onClick={() => setUserDetails(user)}
                      >
                        Details
                      </button>
                      {/* <button
                        className="common-btn-1 warning"
                        onClick={() => alert(`Show orders for ${user.name}`)}
                      >
                        Orders
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="customer-user-no-data">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
