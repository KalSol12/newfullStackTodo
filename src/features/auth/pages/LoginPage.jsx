import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ROUTES } from "../../../shared/constants";
import "../../../shared/styles/auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to={ROUTES.TASKS} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(ROUTES.TASKS, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h1 className="authTitle">Welcome back</h1>
        <p className="authSubtitle">Sign in to manage your todos</p>
        {error && <p className="authError">{error}</p>}
        <form className="authForm" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="authButton" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="authFooter">
          Don&apos;t have an account? <Link to={ROUTES.REGISTER}>Register</Link>
        </p>
      </div>
    </div>
  );
}
