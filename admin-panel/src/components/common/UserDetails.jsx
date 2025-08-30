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
            <div className="customer-user-details-container">
                <div className="customer-no-user-message">
                    <FaUser className="customer-no-user-icon" />
                    <p>No user data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="customer-user-details-container">
            <div className="customer-user-details-content">
                <div className="customer-info-card">
                    <div className="customer-card-header">
                        <FaIdCard className="customer-card-icon" />
                        <h2>Personal Information</h2>
                    </div>
                    <div className="customer-card-body">
                        <div className="customer-info-item">
                            <div className="customer-info-label">
                                <FaUser className="customer-info-icon" />
                                <span>Name</span>
                            </div>
                            <div className="customer-info-value">{user.name || "Not provided"}</div>
                        </div>

                        <div className="customer-info-item">
                            <div className="customer-info-label">
                                <FaEnvelope className="customer-info-icon" />
                                <span>Email</span>
                            </div>
                            <div className="customer-info-value">{user.email || "Not provided"}</div>
                        </div>

                        <div className="customer-info-item">
                            <div className="customer-info-label">
                                <FaPhone className="customer-info-icon" />
                                <span>Mobile</span>
                            </div>
                            <div className="customer-info-value">{user.mobNo || "Not provided"}</div>
                        </div>

                        <div className="customer-info-item">
                            <div className="customer-info-label">
                                <FaUserTag className="customer-info-icon" />
                                <span>Role</span>
                            </div>
                            <div className="customer-info-value role-badge">{user.role || "Not specified"}</div>
                        </div>

                        <div className="customer-info-item">
                            <div className="customer-info-label">
                                <FaCalendarAlt className="customer-info-icon" />
                                <span>Joined On</span>
                            </div>
                            <div className="customer-info-value">
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
                    <div className="customer-info-card">
                        <div className="customer-card-header">
                            <FaMapMarkerAlt className="customer-card-icon" />
                            <h2>Address Details</h2>
                        </div>
                        <div className="customer-card-body">
                            <div className="customer-info-item">
                                <div className="customer-info-label">
                                    <FaHome className="customer-info-icon" />
                                    <span>Address</span>
                                </div>
                                <div className="customer-info-value">{user.address.addressLine || "Not provided"}</div>
                            </div>

                            <div className="customer-info-item">
                                <div className="customer-info-label">
                                    <FaCity className="customer-info-icon" />
                                    <span>City</span>
                                </div>
                                <div className="customer-info-value">{user.address.city || "Not provided"}</div>
                            </div>

                            <div className="customer-info-item">
                                <div className="customer-info-label">
                                    <FaMapMarkerAlt className="customer-info-icon" />
                                    <span>State</span>
                                </div>
                                <div className="customer-info-value">{user.address.state || "Not provided"}</div>
                            </div>

                            <div className="customer-info-item">
                                <div className="customer-info-label">
                                    <FaMapPin className="customer-info-icon" />
                                    <span>Pincode</span>
                                </div>
                                <div className="customer-info-value">{user.address.pincode || "Not provided"}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;