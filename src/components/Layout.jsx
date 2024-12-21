import React, { useState, useEffect } from "react";
import CountdownLazy from "./CountdownLazy";

function Layout() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to the root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const [currentTab, setCurrentTab] = useState("home");

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <div className="flex items-center justify-center h-full">
            <CountdownLazy />
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-center mb-6">Settings</h1>

              {/* Dark Mode Toggle */}
              <div className="mb-4">
                <label className="flex items-center justify-between">
                  <span className="text-lg text-gray-800 dark:text-gray-200">
                    Dark Mode
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                </label>
              </div>

              {/* Notification Preferences */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Notifications
                </h2>
                <label className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Enable Notifications
                  </span>
                  <input type="checkbox" className="toggle toggle-accent" />
                </label>
              </div>

              {/* About Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  About
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Bullish is your personalized Indian Stock Market Calendar app.
                  Track market open/close timings and more.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="w-full bg-gray-200 dark:bg-gray-800 shadow-md p-4 text-center">
        <div className="animate-slideIn">
          <h1 className="text-2xl font-bold text-primary">Bullish</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">{renderContent()}</main>

      {/* Bottom Navigation */}
      <nav className="bg-gray-200 dark:bg-gray-800 shadow-md p-4 fixed bottom-0 w-full flex justify-around">
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
