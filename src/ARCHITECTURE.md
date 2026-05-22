# Frontend architecture

```
src/
├── app/                 # App bootstrap & routing
│   ├── AppProviders.jsx
│   ├── AppRoutes.jsx    # Lazy-loaded routes
│   ├── AppShell.jsx
│   └── ThemeProvider.jsx
├── features/            # Feature modules (domain-driven)
│   ├── auth/
│   ├── todos/
│   ├── calendar/
│   └── stats/
├── layouts/             # Page shells
├── shared/              # Cross-feature code
│   ├── api/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   └── styles/
└── main.jsx
```

## Performance

- **Lazy routes** — pages load on demand (`React.lazy`)
- **Memoized selectors** — `todoSelectors.js` + `useTodoStats` (single-pass stats)
- **React.memo** — `TodoItem`, `TodoList`, `SortableTaskList`
- **Stable callbacks** — `useCallback` / `useMemo` in context and hooks

## Adding a feature

1. Create `src/features/<name>/` with `pages/`, `components/`, hooks as needed
2. Register route in `app/AppRoutes.jsx`
3. Add nav item in `shared/constants/index.js`
