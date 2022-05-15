import React, { useState } from 'react';
import { useTickets } from '../../hooks/useTickets';

export const AddTicketComponent = () => {
  const [description, setDescription] = useState('');
  const { addTicket, loadingAddTickets } = useTickets();

  return <>
    <label>Add Ticket</label>
    <input
      type="text"
      onChange={(e) => setDescription(e.target.value)} />
    <button onClick={() => addTicket!(description)}>Add Ticket</button>
    {loadingAddTickets && <>Adding...</>}
  </>
}
