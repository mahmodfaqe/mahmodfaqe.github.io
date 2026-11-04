import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function Login() {
    const { login, logout } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        try {
            const { data, error } = await login(email, password);
            if (error || !data?.user) {
                alert(error?.message || "Login failed");
                return;
            }

            if (data.role !== "admin") {
                await logout();
                alert("This account is not an administrator.");
                return;
            }

            navigate("/admin/dashboard", { replace: true });
        } finally {
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-orb login-orb-left"></div>
            <div className="login-orb login-orb-right"></div>

            <div className="login-card" data-aos="zoom-in-up" data-aos-duration="700">
                <div className="login-header" data-aos="fade-up" data-aos-delay="80">
                    <h3>Welcome Back</h3>
                    <p>Sign in to the admin panel</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="input-group" data-aos="fade-up" data-aos-delay="140">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={submitting}
                        />
                    </div>
                    <div className="input-group password-group" data-aos="fade-up" data-aos-delay="220">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={submitting}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                            tabIndex={-1}
                        >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </button>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300">
                        <button type="submit" className="login-btn" disabled={submitting}>
                            {submitting ? "Signing in..." : "Login"}
                        </button>
                    </div>
                </form>
                <div className="login-footer" data-aos="fade-up" data-aos-delay="360">
                    <small>Authorized administrators only</small>
                </div>
            </div>
        </div>
    );
}
