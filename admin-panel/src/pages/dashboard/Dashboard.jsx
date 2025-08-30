import "./Dashboard.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/axios";
import { clearPersonalData } from "../../redux/private/personalSlice";
import Analytics from "../../components/analytics/Analytics";
import Orders from "../../components/orders/Orders";
import FetchData from "../../utils/fetchData";
import User from "../../components/users/User";

export default function Dashboard() {
    const data = useSelector((state) => state.personal.data);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("analytics");

    async function Logout() {
        try {
            await api.post("/authentication/signout");
            dispatch(clearPersonalData());
        }
        catch (err) {
            console.error("Logout failed:", err);
        }
    }

    return (
        <div className="dashboard-container">
            <FetchData/>
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <div className="brand">
                        <div className="brand-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6.253C13.184 5.253 14.768 4.5 16.5 4.5C19.538 4.5 22 6.969 22 10C22 12.851 19.851 15.222 17 15.472V19.5C17 20.052 16.552 20.5 16 20.5H7C6.448 20.5 6 20.052 6 19.5V15.472C3.149 15.222 1 12.851 1 10C1 6.969 3.462 4.5 6.5 4.5C8.232 4.5 9.816 5.253 11 6.253Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 6.253V20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="brand-text">WhiteBirds Admin</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button className={`nav-item ${selected === "analytics" ? "active" : ""}`} onClick={() => setSelected("analytics")}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 19V13C9 11.8954 8.10457 11 7 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 5V11C9 12.1046 8.10457 13 7 13H5C3.89543 13 3 12.1046 3 11V5C3 3.89543 3.89543 3 5 3H7C8.10457 3 9 3.89543 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 5V11C21 12.1046 20.1046 13 19 13H17C15.8954 13 15 12.1046 15 11V5C15 3.89543 15.8954 3 17 3H19C20.1046 3 21 3.89543 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 19V13C21 11.8954 20.1046 11 19 11H17C15.8954 11 15 11.8954 15 13V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.1046 21 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="nav-text">Analytics</span>
                    </button>

                    <button className={`nav-item ${selected === "products" ? "active" : ""}`} onClick={() => setSelected("products")}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="nav-text">Products</span>
                    </button>

                    <button className={`nav-item ${selected === "users" ? "active" : ""}`} onClick={() => setSelected("users")}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="nav-text">Users</span>
                    </button>

                    <button className={`nav-item ${selected === "orders" ? "active" : ""}`} onClick={() => setSelected("orders")}>
                        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="nav-text">Orders</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src="/logo.png" alt="avatar" />
                        </div>
                        <div className="user-info">
                            <div className="user-name">{data.admin?.name || 'Admin User'}</div>
                            <div className="user-role">{data.admin?.role || 'Administrator'}</div>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1 className="header-title">Admin {selected.charAt(0).toUpperCase() + selected.slice(1)}</h1>
                    <div className="header-actions">
                        <button className="logout-btn" onClick={Logout} title="Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m9 0l-3-3m3 3l-3 3" />
                            </svg>
                        </button>

                        <div className="user-menu">
                            <div className="user-greeting">Hello, {data.admin?.name?.split(' ')[0] || 'Admin'}</div>
                            <div className="user-status">{data.admin?.email || 'Administrator'}</div>
                        </div>
                    </div>
                </header>
                { selected === "analytics" && <Analytics /> }
                { selected === "orders" && <Orders /> }
                { selected === "users" && <User /> }
            </main>
        </div>
    );
}