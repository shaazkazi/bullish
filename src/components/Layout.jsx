import React, { useState, useEffect } from "react";
import CountdownLazy from "./CountdownLazy";

function Layout() {
  const [currentTab, setCurrentTab] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    const themeColorMeta = document.querySelector("meta[name='theme-color']");
    if (themeColorMeta) {
      themeColorMeta.content = isDarkMode ? "#000000" : "#FFFFFF";
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <CountdownLazy />;
      case "settings":
        return (
          <div className="text-center mt-10">
            <h1 className="text-2xl font-bold">Settings Page</h1>
            <label className="mt-4 inline-flex items-center">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
                className="toggle toggle-accent"
              />
              <span className="ml-2">Dark Mode</span>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Bullish</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 w-full max-w-screen-lg mx-auto">{renderContent()}</main>

      {/* Bottom Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4 fixed bottom-0 w-full flex justify-around">
        <button
          aria-label="Home"
          className={`text-gray-600 dark:text-gray-400 hover:text-blue-500 ${
            currentTab === "home" && "text-blue-500"
          }`}
          onClick={() => setCurrentTab("home")}
        >
          Home
        </button>
        <button
          aria-label="Settings"
          className={`text-gray-600 dark:text-gray-400 hover:text-blue-500 ${
            currentTab === "settings" && "text-blue-500"
          }`}
          onClick={() => setCurrentTab("settings")}
        >
          Settings
        </button>
      </nav>
    </div>
  );
}

export default Layout;
