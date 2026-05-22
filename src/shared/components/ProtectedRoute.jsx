import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="authPage">
        <p className="authLoading">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
