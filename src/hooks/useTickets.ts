import React from 'react';
import { TicketsContext, TicketsContextProps } from '../contexts/TicketsContext';

export const useTickets = (): TicketsContextProps => {
  const context = React.useContext(TicketsContext);
  if (context === undefined) {
    throw new Error('`useTickets` must be within a `TicketsProvider`');
  }
  return context;
};
