import { useEffect, useState, useCallback } from 'react';


export function useSmartBack(options: any) {
  
  const [previousPage, setPreviousPage] = useState<any | null>(null);
  
  
  const goBack = useCallback(() => {
  
  }, []);
  
  const canGoBack = previousPage !== null  !== undefined || 
    (typeof window !== 'undefined' && window.history.length > 1);
  
  return {
    previousPage,
    canGoBack,
    goBack,
  };
}

