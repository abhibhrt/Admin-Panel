import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="number-group">
          <div className="number-4 first">4</div>
          <div className="number-0">0</div>
          <div className="number-4 second">4</div>
        </div>

        <h1 className="not-found-title">Page Not Found</h1>

        <p className="not-found-message">
          Oops! The page you're looking for seems to have flown away.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-btn">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go to Home
          </Link>
        </div>
      </div>

      <div className="stars">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}></div>
        ))}
      </div>

      <div className="planet"></div>
    </div>
  );
}