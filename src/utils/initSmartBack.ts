let isInitialized = false;


export function initSmartBack(): void {
  if (isInitialized) {
    return;
    }
  
  if (typeof window === 'undefined') {
    return;
  }
  
  isInitialized = true;
}

