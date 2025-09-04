import "./Dashboard.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/axios";
import { clearPersonalData } from "../../redux/private/personalSlice";
import Analytics from "../../components/analytics/Analytics";
import Orders from "../../components/common/Orders";
import FetchData from "../../utils/fetchData";
import User from "../../components/common/User";

// React Icons
import { FaChartBar, FaUsers, FaBoxOpen, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import Products from "../../components/common/Products";

export default function Dashboard() {
    const data = useSelector((state) => state.personal.data);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("analytics");

    async function Logout() {
        try {
            await api.post("/auth/signout");
            dispatch(clearPersonalData());
        } catch (err) {
            console.error("Logout failed:", err);
        }
    }

    return (
        <div className="dashboard-container">
            <FetchData />

            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                {/* Sidebar Header */}
                <div className="dashboard-sidebar-header">
                    <div className="dashboard-brand">
                        <div className="dashboard-brand-icon">
                            {/* Custom Icon (React Icons me exact nahi mila) */}
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 6.253C13.184 5.253 14.768 4.5 16.5 4.5C19.538 4.5 22 6.969 22 10C22 12.851 19.851 15.222 17 15.472V19.5C17 20.052 16.552 20.5 16 20.5H7C6.448 20.5 6 20.052 6 19.5V15.472C3.149 15.222 1 12.851 1 10C1 6.969 3.462 4.5 6.5 4.5C8.232 4.5 9.816 5.253 11 6.253Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 6.253V20.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className="dashboard-brand-text">WhiteBirds Admin</span>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="dashboard-sidebar-nav">
                    <button
                        className={`dashboard-nav-item ${selected === "analytics" ? "active" : ""
                            }`}
                        onClick={() => setSelected("analytics")}
                    >
                        <FaChartBar className="dashboard-nav-icon" />
                        <span className="dashboard-nav-text">Analytics</span>
                    </button>

                    <button
                        className={`dashboard-nav-item ${selected === "products" ? "active" : ""
                            }`}
                        onClick={() => setSelected("products")}
                    >
                        <FaBoxOpen className="dashboard-nav-icon" />
                        <span className="dashboard-nav-text">Products</span>
                    </button>

                    <button
                        className={`dashboard-nav-item ${selected === "users" ? "active" : ""
                            }`}
                        onClick={() => setSelected("users")}
                    >
                        <FaUsers className="dashboard-nav-icon" />
                        <span className="dashboard-nav-text">Users</span>
                    </button>

                    <button
                        className={`dashboard-nav-item ${selected === "orders" ? "active" : ""
                            }`}
                        onClick={() => setSelected("orders")}
                    >
                        <FaClipboardList className="dashboard-nav-icon" />
                        <span className="dashboard-nav-text">Orders</span>
                    </button>
                </nav>

                {/* Sidebar Footer */}
                <div className="dashboard-sidebar-footer">
                    <div className="dashboard-user-profile">
                        <div className="dashboard-user-avatar">
                            <img src="/logo.png" alt="avatar" />
                        </div>
                        <div className="dashboard-user-info">
                            <div className="dashboard-user-name">
                                {data.admin?.name || "Admin User"}
                            </div>
                            <div className="dashboard-user-role">
                                {data.admin?.role || "Administrator"}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="dashboard-main">
                {/* Header */}
                <header className="dashboard-header">
                    <h1 className="dashboard-header-title">
                        Admin {selected.charAt(0).toUpperCase() + selected.slice(1)}
                    </h1>
                    <div className="dashboard-header-actions">
                        <div className="dashboard-user-menu">
                            <div className="dashboard-user-greeting">
                                Hello, {data.admin?.name?.split(" ")[0] || "Admin"}
                            </div>
                            <div className="dashboard-user-status">
                                {data.admin?.email || "Administrator"}
                            </div>
                        </div>
                        <button
                            className="dashboard-logout-btn"
                            onClick={Logout}
                            title="Logout"
                        >
                            <FaSignOutAlt className="dashboard-logout-icon" />
                        </button>
                    </div>
                </header>

                {/* Pages */}
                {selected === "analytics" && <Analytics />}
                {selected === "orders" && <Orders />}
                {selected === "users" && <User />}
                {selected === "products" && <Products />}
            </main>
        </div>
    );
}
