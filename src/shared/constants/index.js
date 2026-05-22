export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  TASKS: "/tasks",
  CALENDAR: "/calendar",
  STATS: "/stats",
};

export const NAV_ITEMS = [
  { to: ROUTES.TASKS, label: "Tasks", icon: "✓" },
  { to: ROUTES.CALENDAR, label: "Calendar", icon: "📅" },
  { to: ROUTES.STATS, label: "Stats", icon: "📊" },
];

export const CATEGORIES = ["Work", "Study", "Personal", "Health"];
export const PRIORITIES = ["Low", "Medium", "High"];

export const DEFAULT_TODO_FORM = {
  text: "",
  startDate: "",
  endDate: "",
  priority: "Low",
  category: "Work",
};

export const STORAGE_KEYS = {
  TOKEN: "todo_token",
  USER: "todo_user",
  DARK_MODE: "darkMode",
};
