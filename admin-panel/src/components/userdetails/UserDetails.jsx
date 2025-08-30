import React from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaUserTag,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaCity,
    FaMapPin,
    FaHome,
    FaIdCard
} from "react-icons/fa";
import "./UserDetails.css";

const UserDetails = ({ user }) => {
    if (!user) {
        return (
            <div className="user-details-container">
                <div className="user-details-no-user-message">
                    <FaUser className="user-details-no-user-icon" />
                    <p>No user data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-details-container">
            <div className="user-details-content">
                {/* Personal Information Card */}
                <div className="user-details-card">
                    <div className="user-details-card-header">
                        <FaIdCard className="user-details-card-icon" />
                        <h2>Personal Information</h2>
                    </div>
                    <div className="user-details-card-body">
                        <div className="user-details-item">
                            <div className="user-details-label">
                                <FaUser className="user-details-icon" />
                                <span>Name</span>
                            </div>
                            <div className="user-details-value">{user.name || "Not provided"}</div>
                        </div>

                        <div className="user-details-item">
                            <div className="user-details-label">
                                <FaEnvelope className="user-details-icon" />
                                <span>Email</span>
                            </div>
                            <div className="user-details-value">{user.email || "Not provided"}</div>
                        </div>

                        <div className="user-details-item">
                            <div className="user-details-label">
                                <FaPhone className="user-details-icon" />
                                <span>Mobile</span>
                            </div>
                            <div className="user-details-value">{user.mobNo || "Not provided"}</div>
                        </div>

                        <div className="user-details-item">
                            <div className="user-details-label">
                                <FaUserTag className="user-details-icon" />
                                <span>Role</span>
                            </div>
                            <div className="user-details-value role-badge">{user.role || "Not specified"}</div>
                        </div>

                        <div className="user-details-item">
                            <div className="user-details-label">
                                <FaCalendarAlt className="user-details-icon" />
                                <span>Joined On</span>
                            </div>
                            <div className="user-details-value">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : "Not available"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Card */}
                {user.address && (
                    <div className="user-details-card">
                        <div className="user-details-card-header">
                            <FaMapMarkerAlt className="user-details-card-icon" />
                            <h2>Address Details</h2>
                        </div>
                        <div className="user-details-card-body">
                            <div className="user-details-item">
                                <div className="user-details-label">
                                    <FaHome className="user-details-icon" />
                                    <span>Address</span>
                                </div>
                                <div className="user-details-value">{user.address.addressLine || "Not provided"}</div>
                            </div>

                            <div className="user-details-item">
                                <div className="user-details-label">
                                    <FaCity className="user-details-icon" />
                                    <span>City</span>
                                </div>
                                <div className="user-details-value">{user.address.city || "Not provided"}</div>
                            </div>

                            <div className="user-details-item">
                                <div className="user-details-label">
                                    <FaMapMarkerAlt className="user-details-icon" />
                                    <span>State</span>
                                </div>
                                <div className="user-details-value">{user.address.state || "Not provided"}</div>
                            </div>

                            <div className="user-details-item">
                                <div className="user-details-label">
                                    <FaMapPin className="user-details-icon" />
                                    <span>Pincode</span>
                                </div>
                                <div className="user-details-value">{user.address.pincode || "Not provided"}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
