import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Observable, Subscription } from 'rxjs';
import { Ticket, User } from '../backend';
import { useBackend } from '../hooks/useBackend';

export interface TicketsContextProps {
  tickets: Ticket[],
  users: User[],
  loading: boolean,
  loadingTickets: boolean,
  loadingAddTickets: boolean,
  loadingUsers: boolean,
  loadingAssignTicketTo: boolean,
  loadingCompleteTicket: boolean,

  // methods to interact with backend
  addTicket: null | ((description: string) => Observable<Ticket>),
  assignTicketTo: null | ((ticketId: number, userId: number) => Observable<Ticket>),
  completeTicket: null | ((ticketId: number, complete: boolean) => Observable<any>),
  getTicket: null | ((ticketId: number) => Observable<Ticket>),
}

export interface TicketsProviderProps {
  children: React.ReactNode,
}

export const TicketsContext = React.createContext({
  tickets: [],
  users: [],
  loading: false,
  loadingTickets: false,
  loadingAddTickets: false,
  loadingUsers: false,
  loadingAssignTicketTo: false,
  loadingCompleteTicket: false,

  addTicket: null,
  assignTicketTo: null,
  completeTicket: null,
  getTicket: null,
} as TicketsContextProps);

export const TicketsProvider = ({ children }: TicketsProviderProps): JSX.Element => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);
  const [loading, setLoading] = useState(false);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [loadingAddTickets, setLoadingAddTickets] = useState(false);
  const [loadingAssignTicketTo, setLoadingAssignTicketTo] = useState(false);
  const [loadingCompleteTicket, setLoadingCompleteTicket] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const backend = useBackend();

  const addTicket = useCallback((description: string) => {
    setLoadingAddTickets(true);
    const obsNewTicket = backend.newTicket({ description });
    obsNewTicket.subscribe(_ => {
      setLoadingAddTickets(false);
    });
    return obsNewTicket;
  }, [backend]);

  const getTicket = useCallback((ticketId: number) => {
    // NOTE: Talk about moving item-specific loading variables to component
    return backend.ticket(ticketId);
  }, [backend]);

  const assignTicketTo = useCallback((ticketId: number, userId: number) => {
    setLoadingAssignTicketTo(true);
    const obsAssignTicketTo = backend.assign(ticketId, userId);
    obsAssignTicketTo.subscribe(_ => {
      setLoadingAssignTicketTo(false);
    });
    return obsAssignTicketTo;
  }, [backend]);

  const completeTicket = useCallback((ticketId: number, complete: boolean) => {
    setLoadingCompleteTicket(true);
    const obsCompleteTicket = backend.complete(ticketId, complete);
    obsCompleteTicket.subscribe(_ => {
      setLoadingCompleteTicket(false);
    });
    return obsCompleteTicket;
  }, [backend]);

  useEffect(() => {
    setLoadingUsers(true);
    setLoadingTickets(true);
    const subs: Subscription[] = [
      backend.tickets().subscribe(result => {
        setLoadingTickets(false);
        setTickets(result);
      }),
      backend.users().subscribe(result => {
        setLoadingUsers(false);
        setUsers(result);
      })
    ];
    return () => subs.forEach((sub) => sub.unsubscribe()); // clean up subscription
  }, [backend]);

  useEffect(() => {
    setLoading(loadingAddTickets || loadingTickets || loadingUsers || loadingAssignTicketTo);
    return () => {
      setLoading(false);
    }
  }, [loadingAddTickets, loadingTickets, loadingUsers, loadingAssignTicketTo])

  const value = useMemo(() => ({
    tickets,
    users,
    loading,
    loadingTickets,
    loadingAddTickets,
    loadingUsers,
    loadingAssignTicketTo,
    loadingCompleteTicket,

    addTicket,
    assignTicketTo,
    completeTicket,
    getTicket,
  } as TicketsContextProps), [
    tickets,
    users,
    loading,
    loadingTickets,
    loadingAddTickets,
    loadingUsers,
    loadingAssignTicketTo,
    loadingCompleteTicket,

    // its memoized so its ok to put it here
    addTicket,
    assignTicketTo,
    completeTicket,
    getTicket,
  ]);
  return (<TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>);
}
