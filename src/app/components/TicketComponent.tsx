import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from '../../backend';
import { useTickets } from '../../hooks/useTickets';
import { UsersListComponent } from './UserListComponent';

interface TicketComponentProps {
  ticket: Ticket | null
}

export const TicketComponent = ({ ticket }: TicketComponentProps) => {
  const { loadingCompleteTicket, completeTicket } = useTickets();

  if (ticket === null) {
    return <></>;
  }

  return <>
    Ticket: {ticket.id}, {ticket.description}
    <input type="checkbox" onChange={(e) => completeTicket!(ticket.id, e.target.checked)} />
    {loadingCompleteTicket && <>Setting Complete...</>}
    <UsersListComponent ticketId={ticket.id} assignedUserId={ticket.assigneeId} />
    <Link to={`/tickets/${ticket.id}`}>Details</Link>
  </>
}
