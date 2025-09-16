// Global ElevenLabs script loader to prevent duplicate loading

let scriptLoaded = false;
let scriptLoading = false;
let loadPromise = null;

export const loadElevenLabsScript = () => {
  // If already loaded, return resolved promise
  if (scriptLoaded) {
    return Promise.resolve();
  }

  // If currently loading, return existing promise
  if (scriptLoading && loadPromise) {
    return loadPromise;
  }

  // Check if script already exists in DOM
  const existingScript = document.querySelector('script[src*="elevenlabs/convai-widget-embed"]');
  if (existingScript) {
    scriptLoaded = true;
    return Promise.resolve();
  }

  // Start loading
  scriptLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    script.id = 'elevenlabs-widget-script';

    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      console.log('✅ ElevenLabs script loaded globally');
      resolve();
    };

    script.onerror = (error) => {
      scriptLoading = false;
      console.error('❌ Failed to load ElevenLabs script:', error);
      reject(error);
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

export const isElevenLabsScriptLoaded = () => {
  return scriptLoaded || !!document.querySelector('script[src*="elevenlabs/convai-widget-embed"]');
};

export const isElevenLabsElementDefined = () => {
  return customElements.get('elevenlabs-convai');
};



