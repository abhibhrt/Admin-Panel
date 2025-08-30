import React, { useState } from "react";
import "./User.css";
import { useSelector } from "react-redux";
import UserDetails from "../common/UserDetails";

const User = () => {
  const users = useSelector((state) => state.user.data) || [];
  console.log(users);
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
      ? user.orders
          .map((order) => order.product?.title || "")
          .join(" ")
          .toLowerCase()
      : "";

    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      inAddress.includes(searchLower) ||
      inOrders.includes(searchLower)
    );
  });

  return (
    <div className="users-container">
      <input
        type="text"
        placeholder="Search users, address, or orders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="users-search"
      />

      {/* 🧾 Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.orders?.length || 0}</td>
                  <td>
                    <div className="user-actions-container">
                      <button
                        className="user-action-btn user-view-btn"
                        onClick={() => setUserDetails(user)}
                      >
                        View Details
                      </button>
                      <button
                        className="user-action-btn user-orders-btn"
                        onClick={() => alert(`Show orders for ${user.name}`)}
                      >
                        View Orders
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-users">
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
