import React, { useEffect, useState } from 'react';
import { User } from '../../backend';
import { useTickets } from '../../hooks/useTickets';

interface UsersListComponentProps {
  ticketId: number,
  assignedUserId: number | null,
}

export const UsersListComponent = ({ ticketId, assignedUserId }: UsersListComponentProps) => {
  const [selectedUser, setSelectedUser] = useState(assignedUserId === null ? -1 : assignedUserId);
  const { users, loadingUsers, loadingAssignTicketTo, assignTicketTo } = useTickets();

  const onChange = (e: any) => {
    setSelectedUser(parseInt(e.target.value));
  }

  useEffect(() => {
    if (users.length > 0 && selectedUser === -1) {
      setSelectedUser(users[0].id);
    }
  }, [users, selectedUser]);

  if (loadingUsers) {
    return <>Loading users...</>;
  }

  return <>
    <button onClick={() => assignTicketTo!(ticketId, selectedUser)}>
      Assign To
    </button>
    <select onChange={onChange} value={selectedUser}>
      {users.map((user: User) => <option key={user.id} value={user.id}>{user.name}</option>)}
    </select>
    {loadingAssignTicketTo && <>Assigning...</>}
  </>
}
