// src/components/CountdownLazy.jsx
import React from 'react';

const CountdownLazy = React.lazy(() => import('./Countdown'));

const LazyCountdown = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <CountdownLazy />
  </React.Suspense>
);

export default LazyCountdown;
    