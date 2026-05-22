import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import PageLoader from "../shared/components/PageLoader";
import AppShell from "./AppShell";
import { ROUTES } from "../shared/constants";

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));
const TasksPage = lazy(() => import("../features/todos/pages/TasksPage"));
const CalendarPage = lazy(() => import("../features/calendar/pages/CalendarPage"));
const StatsPage = lazy(() => import("../features/stats/pages/StatsPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to={ROUTES.TASKS} replace />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.TASKS} replace />} />
      </Routes>
    </Suspense>
  );
}
