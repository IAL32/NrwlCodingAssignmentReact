import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppRoutes } from "./app-routes";
import { TicketsProvider } from "./contexts/TicketsContext";
import { BackendProvider } from "./contexts/BackendContext";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BackendProvider>
        <TicketsProvider>
          <AppRoutes />
        </TicketsProvider>
      </BackendProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
