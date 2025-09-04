import { useState } from "react";
import api from "../../utils/axios";
import "./auth.css";

export default function Signin({ setAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/signin", form);
      setMsg({ message: res.data.message, status: "success" });
      setAuth(null);
      window.location.reload();
    } catch (err) {
      setMsg({ message: err.response?.data?.error, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <span onClick={() => setAuth(null)} className="auth-close-cross">✖</span>
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              required
              className="auth-input"
            />
            <label className="input-label">Email Address</label>

          </div>

          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              required
              className="auth-input"
            />
            <label className="input-label">Password</label>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <span onClick={() => setAuth(1)} className="auth-link">forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-btn success ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {msg && (
          <div className={`auth-message ${msg.status === "error" ? "error" : "success"}`}>
            {msg.message}
          </div>
        )}

        <div className="auth-footer">
          <p>Admin Access Only!</p>
        </div>
      </div>
    </div>
  );
}