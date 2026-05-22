import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "../features/auth/AuthContext";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
