import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TicketComponent } from '../../../app/components/TicketComponent';
import { Ticket } from '../../../backend';
import { useTickets } from '../../../hooks/useTickets';

const TicketDetail = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const { getTicket } = useTickets();
  const { ticketId } = useParams();

  useEffect(() => {
    if (ticketId) {
      setLoading(true);
      
      try {
        // need to catch this cause backend throws in a weird way
        const sub = getTicket!(parseInt(ticketId))
          .subscribe({
            next: (result: Ticket) => {
              setTicket(result);
              setLoading(false);
            },
            error: (error) => console.error(error)
          });
        return () => {
          setLoading(false);
          sub.unsubscribe()
        };
      } catch (error) {
        setTicket(null);
        setLoading(false);
      }
    }
  }, [ticketId, getTicket]);

  if (loading) {
    return <>Loading Ticket...</>;
  }

  if (ticket === null) {
    return <>404: Ticket not found</>
  }

  return <>
    <h1>{ticketId}: </h1>
    <div><Link to="/">Home</Link></div>
    <TicketComponent ticket={ticket!} />
  </>;
}

export default TicketDetail;
