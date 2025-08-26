"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ElevenLabsContext = createContext();

export function ElevenLabsProvider({ children }) {
  const [widgetVariables, setWidgetVariables] = useState({
    site_name: "Dinar Exchange",
    current_page: "/"
  });

  const updateWidgetVariables = useCallback((newVariables) => {
    setWidgetVariables(prev => ({ ...prev, ...newVariables }));
  }, []);

  const setUserContext = useCallback((userEmail, orderId) => {
    updateWidgetVariables({
      user_email: userEmail,
      current_order_id: orderId
    });
  }, [updateWidgetVariables]);

  const clearUserContext = useCallback(() => {
    setWidgetVariables(prev => {
      const { user_email, current_order_id, ...rest } = prev;
      return rest;
    });
  }, []);

  // Update current page when route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateWidgetVariables({
        current_page: window.location.pathname
      });
    }
  }, [updateWidgetVariables]);

  const value = useMemo(() => ({
    widgetVariables,
    updateWidgetVariables,
    setUserContext,
    clearUserContext
  }), [widgetVariables, updateWidgetVariables, setUserContext, clearUserContext]);

  return (
    <ElevenLabsContext.Provider value={value}>
      {children}
    </ElevenLabsContext.Provider>
  );
}

export function useElevenLabs() {
  const context = useContext(ElevenLabsContext);
  if (!context) {
    throw new Error('useElevenLabs must be used within an ElevenLabsProvider');
  }
  return context;
}
