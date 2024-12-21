import React, { useEffect } from "react";
import Layout from "./components/Layout";
import LazyCountdown from "./components/CountdownLazy";

function App() {
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDarkMode);

    const themeColorMeta = document.querySelector("meta[name='theme-color']");
    themeColorMeta.content = prefersDarkMode ? "#000000" : "#FFFFFF";
  }, []);

  return (
    <Layout>
      <LazyCountdown />
    </Layout>
  );
}

export default App;
