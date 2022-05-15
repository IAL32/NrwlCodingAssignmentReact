import React from "react";
import "./app.css";
import { useTickets } from "../hooks/useTickets";
import { TicketComponent } from "./components/TicketComponent";
import { AddTicketComponent } from "./components/AddTicketComponent";

const App = () => {
  const { tickets, loadingTickets } = useTickets();

  return (
    <div className="app">
      <h2>Tickets</h2>
      <AddTicketComponent />
      <br />
      {loadingTickets && <>Loading...</>}
      {tickets ? (
        <ul>
          {tickets.map((t) => (
            <li key={t.id}>
              <TicketComponent key={t.id} ticket={t} />
            </li>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
};

export default App;
