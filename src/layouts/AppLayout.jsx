import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { useTheme } from "../app/ThemeProvider";
import { NAV_ITEMS, ROUTES } from "../shared/constants";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle =
    NAV_ITEMS.find((item) => location.pathname.startsWith(item.to))?.label || "Todo App";

  return (
    <div className={`appShell ${darkMode ? "dark" : ""}`}>
      <div className="topBackground" />

      {sidebarOpen && (
        <button
          type="button"
          className="sidebarBackdrop"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebarOpen" : ""}`}>
        <div className="sidebarBrand">
          <span className="brandIcon">✦</span>
          <span className="brandText">Todo App</span>
        </div>
        <nav className="sidebarNav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebarLink ${isActive ? "sidebarLinkActive" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebarLinkIcon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebarFooter">
          <p className="sidebarUser">Signed in as {user?.name}</p>
          <button type="button" className="sidebarThemeBtn" onClick={toggleTheme}>
            {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
          </button>
          <button
            type="button"
            className="sidebarLogoutBtn"
            onClick={() => {
              logout();
              navigate(ROUTES.LOGIN);
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="mainWrapper">
        <header className="mainHeader">
          <button
            type="button"
            className="menuToggle"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="pageTitle">{pageTitle}</h1>
          <button type="button" className="headerThemeBtn" onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </header>
        <main className="mainContent">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
