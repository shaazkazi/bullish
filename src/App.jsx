import React from "react";
import Layout from "./components/Layout";
import LazyCountdown from "./components/CountdownLazy";

function App() {
  return (
    <Layout>
      <LazyCountdown />
    </Layout>
  );
}

export default App; // Ensure default export
