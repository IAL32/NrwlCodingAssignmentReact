import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const TicketDetail = lazy(() => import("./views/tickets/details/TicketDetail"));
const App = lazy(() => import("./app/app"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
          <Route path="tickets">
            <Route path=":ticketId" element={<TicketDetail />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
