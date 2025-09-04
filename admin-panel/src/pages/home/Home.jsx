import "./Home.css";
import react, { useState } from "react";
import Reset from "../../components/auth/ResetPassword";
import Signin from "../../components/auth/Signin";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export default function Home() {
    const [auth, setAuth] = useState(null);
    const authorised = useSelector((state) => state.personal.data !== null);
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Welcome to <span className="brand-accent">Admin Panel</span>
                    </h1>

                    <p className="hero-subtitle">
                        WhiteBirds Admin Dashboard
                    </p>

                    {
                        !authorised ? (
                            <div className="cta-buttons">
                                <button
                                    onClick={() => setAuth(2)}
                                    className="cta-btn secondary"
                                >
                                    Sign In
                                </button>
                            </div>
                        ) : (
                            <div className="cta-buttons">
                                <Link to="/dashboard" className="cta-btn third">
                                    Dashboard 
                                </Link>
                            </div>
                        )
                    }
                </div>

                <div className="hero-visual">
                    <div className="floating-card">
                        <div className="card-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19.4 15C19.2669 15.2956 19.2271 15.6252 19.286 15.9428C19.3448 16.2604 19.4995 16.551 19.729 16.7753C19.9585 16.9996 20.2518 17.1471 20.5655 17.1968C20.8792 17.2465 21.1982 17.1961 21.48 17.052L21.58 17C21.8526 16.8726 22.0834 16.6715 22.2452 16.4206C22.407 16.1696 22.4933 15.8785 22.4945 15.581C22.4957 15.2835 22.4118 14.9917 22.252 14.7395C22.0922 14.4873 21.8631 14.2844 21.592 14.154L19.6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.60002 15C4.73312 15.2956 4.7729 15.6252 4.71403 15.9428C4.65516 16.2604 4.50055 16.551 4.27102 16.7753C4.04149 16.9996 3.74822 17.1471 3.43452 17.1968C3.12082 17.2465 2.80183 17.1961 2.52002 17.052L2.42002 17C2.14744 16.8726 1.91665 16.6715 1.75483 16.4206C1.593 16.1696 1.50673 15.8785 1.50552 15.581C1.50431 15.2835 1.58822 14.9917 1.74802 14.7395C1.90782 14.4873 2.13692 14.2844 2.40802 14.154L4.40002 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.60002 9C4.73312 8.70441 4.7729 8.37481 4.71403 8.05719C4.65516 7.73958 4.50055 7.44902 4.27102 7.2247C4.04149 7.00039 3.74822 6.85293 3.43452 6.80322C3.12082 6.75351 2.80183 6.80388 2.52002 6.948L2.42002 7C2.14744 7.12742 1.91665 7.32849 1.75483 7.57944C1.593 7.83039 1.50673 8.12153 1.50552 8.419C1.50431 8.71647 1.58822 9.00832 1.74802 9.26054C1.90782 9.51275 2.13692 9.71564 2.40802 9.846L4.40002 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19.4 9C19.2669 8.70441 19.2271 8.37481 19.286 8.05719C19.3448 7.73958 19.4995 7.44902 19.729 7.2247C19.9585 7.00039 20.2518 6.85293 20.5655 6.80322C20.8792 6.75351 21.1982 6.80388 21.48 6.948L21.58 7C21.8526 7.12742 22.0834 7.32849 22.2452 7.57944C22.407 7.83039 22.4933 8.12153 22.4945 8.419C22.4957 8.71647 22.4118 9.00832 22.252 9.26054C22.0922 9.51275 21.8631 9.71564 21.592 9.846L19.6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>Secure Access</h3>
                        <p>Protected admin dashboard</p>
                    </div>

                    <div className="floating-card">
                        <div className="card-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 19V13C9 11.8954 8.10457 11 7 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 5V11C9 12.1046 8.10457 13 7 13H5C3.89543 13 3 12.1046 3 11V5C3 3.89543 3.89543 3 5 3H7C8.10457 3 9 3.89543 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 5V11C21 12.1046 20.1046 13 19 13H17C15.8954 13 15 12.1046 15 11V5C15 3.89543 15.8954 3 17 3H19C20.1046 3 21 3.89543 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 19V13C21 11.8954 20.1046 11 19 11H17C15.8954 11 15 11.8954 15 13V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.1046 21 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>Data Insights</h3>
                        <p>Analytics and reporting</p>
                    </div>
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
            <div className="background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>
            <div className="auth-popup"> {auth && (auth == 1 ? (<Reset setAuth={setAuth} />) : (<Signin setAuth={setAuth} />))} </div>
        </div>
    );
}