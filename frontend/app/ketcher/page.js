"use client";

import 'ketcher-react/dist/index.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { StandaloneStructServiceProvider } from 'ketcher-standalone';

// Dynamically import the Editor component from ketcher-react
const Editor = dynamic(() => import('ketcher-react').then(mod => mod.Editor), {
  ssr: false,
});

export default function EditorPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this code runs only on the client
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>Loading...</div>;
  }

  const structServiceProvider = new StandaloneStructServiceProvider();

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Editor
        staticResourcesUrl={process.env.PUBLIC_URL}
        structServiceProvider={structServiceProvider}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
