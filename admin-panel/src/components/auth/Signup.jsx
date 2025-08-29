import { useState } from "react";
import api from "../../utils/axios";
import "./auth.css";

export default function Signup({ setAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await api.post("/authentication/signup", form);
      setMsg(res.data.message);
      setAuth(null);
      window.location.reload();
    } catch (err) {
      setMsg(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <span onClick={() => setAuth(null)} className="auth-close-cross">✖</span>
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us to get started</p>
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

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-btn primary ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              'Register Now'
            )}
          </button>
        </form>

        {msg && (
          <div className={`auth-message ${msg.includes("wrong") ? "error" : "success"}`}>
            <span className="message-icon">
              {msg.includes("wrong") ? "⚠️" : "✅"}
            </span>
            {msg}
          </div>
        )}

        <div className="auth-footer">
          <p>Already have an account? <button onClick={() => setAuth(2)} className="auth-link">Sign In</button></p>
        </div>
      </div>
    </div>
  );
}