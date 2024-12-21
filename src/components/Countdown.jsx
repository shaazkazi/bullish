import React, { useEffect, useState } from "react";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [marketStatus, setMarketStatus] = useState("");

  const updateTimer = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const nowIST = new Date(now.getTime() + istOffset);

    // Define market open and close times for today
    const openTime = new Date(nowIST);
    openTime.setHours(9, 15, 0, 0);

    const closeTime = new Date(nowIST);
    closeTime.setHours(15, 30, 0, 0);

    // Check if today is a weekend (Saturday or Sunday)
    const isWeekend = nowIST.getDay() === 0 || nowIST.getDay() === 6;

    if (isWeekend || nowIST > closeTime) {
      // Market is closed; calculate next open time (Monday 9:15 AM)
      const nextOpen = new Date(nowIST);
      if (nowIST.getDay() === 6) {
        nextOpen.setDate(nowIST.getDate() + 2); // If Saturday, market opens on Monday
      } else if (nowIST.getDay() === 0) {
        nextOpen.setDate(nowIST.getDate() + 1); // If Sunday, market opens on Monday
      }
      nextOpen.setHours(9, 15, 0, 0);

      setMarketStatus("Market Closed");
      setTimeRemaining(`Opens in ${getTimeDifference(nowIST, nextOpen)}`);
    } else if (nowIST < openTime) {
      setMarketStatus("Market Closed");
      setTimeRemaining(`Opens in ${getTimeDifference(nowIST, openTime)}`);
    } else if (nowIST >= openTime && nowIST <= closeTime) {
      setMarketStatus("Market Open");
      setTimeRemaining(`Closes in ${getTimeDifference(nowIST, closeTime)}`);
    }
  };

  const getTimeDifference = (start, end) => {
    const diff = end - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Calculate days
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
    const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Calculate seconds
    return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  };

  useEffect(() => {
    updateTimer(); // Initial call to set the state immediately
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-xl text-white animate-fadeIn">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        {marketStatus}
      </h1>
      <div className="text-lg md:text-2xl font-medium bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg">
        {timeRemaining}
      </div>
    </div>
  );
}

export default Countdown;
