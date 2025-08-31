import "./Analytics.css";
import { useSelector, shallowEqual } from "react-redux";
import { useMemo } from "react";
import { FaBoxOpen, FaUsers, FaClipboardList, FaExclamationCircle } from "react-icons/fa";

export default function Analytics() {
  const data = useSelector((state) => state.personal.data);

  const rawProducts = useSelector((state) => state.product.data, shallowEqual);
  const rawUsers = useSelector((state) => state.user.data, shallowEqual);
  const rawOrders = useSelector((state) => state.order.data, shallowEqual);

  const products = useMemo(() => rawProducts || [], [rawProducts]);
  const users = useMemo(() => rawUsers || [], [rawUsers]);
  const orders = useMemo(() => rawOrders || [], [rawOrders]);

  const totalProducts = products.length;
  const totalUsers = users.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const issuesReported = orders.filter((o) => o.status === "Issue").length;

  return (
    <main className="analytics-content">
      {/* Welcome Card */}
      <div className="welcome-card">
        <div className="welcome-content">
          <h2 className="welcome-title">
            Welcome back, {data?.admin?.name} 👋
          </h2>
          <p className="welcome-text">
            You are logged in as{" "}
            <span className="role-highlight">{data?.admin?.role}</span>.  
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="welcome-graphic">
          <div className="graphic-circle"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <FaBoxOpen />
          </div>
          <div className="stat-info">
            <div className="stat-value">{totalProducts}</div>
            <div className="stat-label">Total Products</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FaUsers />
          </div>
          <div className="stat-info">
            <div className="stat-value">{totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <FaClipboardList />
          </div>
          <div className="stat-info">
            <div className="stat-value">{pendingOrders}</div>
            <div className="stat-label">Pending Orders</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon error">
            <FaExclamationCircle />
          </div>
          <div className="stat-info">
            <div className="stat-value">{issuesReported}</div>
            <div className="stat-label">Issues Reported</div>
          </div>
        </div>
      </div>
    </main>
  );
}
