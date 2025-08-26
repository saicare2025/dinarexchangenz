"use client";

import { useEffect, useMemo } from 'react';
import { useElevenLabs } from './ElevenLabsContext';

/**
 * Hook to set user context for ElevenLabs widget
 * Use this on pages where you want to pass user-specific information to the AI agent
 * 
 * @param {string} userEmail - User's email address
 * @param {string} orderId - Current order ID (optional)
 * @param {boolean} clearOnUnmount - Whether to clear context when component unmounts
 */
export function useElevenLabsUser(userEmail, orderId = null, clearOnUnmount = true) {
  const { setUserContext, clearUserContext } = useElevenLabs();

  useEffect(() => {
    if (userEmail) {
      setUserContext(userEmail, orderId);
    }

    // Cleanup function
    return () => {
      if (clearOnUnmount) {
        clearUserContext();
      }
    };
  }, [userEmail, orderId, clearOnUnmount, setUserContext, clearUserContext]);
}

/**
 * Hook to set page-specific context for ElevenLabs widget
 * 
 * @param {object} pageContext - Page-specific variables to pass to the AI agent
 */
export function useElevenLabsPage(pageContext) {
  const { updateWidgetVariables } = useElevenLabs();

  // Memoize the page context to prevent unnecessary re-renders
  const memoizedPageContext = useMemo(() => pageContext, [JSON.stringify(pageContext)]);

  useEffect(() => {
    if (memoizedPageContext) {
      updateWidgetVariables(memoizedPageContext);
    }
  }, [memoizedPageContext, updateWidgetVariables]);
}
