import { useState } from "react";
import api from "../../utils/axios";
import "./auth.css";

export default function Reset({ setAuth }) {
  const [form, setForm] = useState({ name: "", email: "", newPassword: "" });
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
      const res = await api.post("/auth/reset-password", form);
      setMsg({ message: res.data.message, status: "success" });
      setAuth(null);
      window.location.reload();
    } catch (err) {
      setMsg({ message: err.response?.data?.error || "Something went wrong", status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <span onClick={() => setAuth(null)} className="auth-close-cross">✖</span>
        <div className="auth-header">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">otp validation required</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <input
              name="name"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
              required
              className="auth-input"
            />
            <label className="input-label">Full Name</label>

          </div>

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
              name="newPassword"
              type="password"
              placeholder=" "
              value={form.newPassword}
              onChange={handleChange}
              required
              className="auth-input"
            />
            <label className="input-label">New Password</label>

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-btn primary ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                otp sendig...
              </>
            ) : (
              'Send OTP'
            )}
          </button>
        </form>

        {msg && (
          <div className={`auth-message ${msg.status === "error" ? "error" : "success"}`}>
            {msg.message}
          </div>
        )}

        <div className="auth-footer">
          <p><button onClick={() => setAuth(2)} className="auth-link">Sign In</button></p>
        </div>
      </div>
    </div>
  );
}