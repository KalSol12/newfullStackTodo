import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./app/AppProviders";
import AppRoutes from "./app/AppRoutes";
import "./shared/styles/app.css";
import "./shared/styles/layout.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </BrowserRouter>
);
