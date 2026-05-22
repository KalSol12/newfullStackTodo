import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ROUTES } from "../../../shared/constants";
import "../../../shared/styles/auth.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to={ROUTES.TASKS} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(name, email, password);
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
        <h1 className="authTitle">Create account</h1>
        <p className="authSubtitle">Start organizing your tasks</p>
        {error && <p className="authError">{error}</p>}
        <form className="authForm" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </label>
          <button type="submit" className="authButton" disabled={submitting}>
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="authFooter">
          Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
