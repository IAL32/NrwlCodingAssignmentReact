import React from 'react';
import { BackendService } from '../backend';
import { BackendContext } from '../contexts/BackendContext';

export const useBackend = (): BackendService => {
  const context = React.useContext(BackendContext);
  if (context === undefined) {
    throw new Error('`useBackend` must be within a `BackendProvider`');
  }
  return context;
};
