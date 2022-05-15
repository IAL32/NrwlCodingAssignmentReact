import React from 'react';
import { BackendService } from '../backend';

export interface BackendProviderProps {
  children: React.ReactNode,
}

const backend = new BackendService();

export const BackendContext = React.createContext(backend);

export const BackendProvider = ({ children }: BackendProviderProps): JSX.Element => {
  return (<BackendContext.Provider value={backend}>{children}</BackendContext.Provider>);
}
