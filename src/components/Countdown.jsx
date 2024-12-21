import React, { useEffect, useState } from "react";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState("");
  const [marketStatus, setMarketStatus] = useState("");

  useEffect(() => {
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
          // If Saturday, market opens on Monday
          nextOpen.setDate(nowIST.getDate() + 2);
        } else if (nowIST.getDay() === 0) {
          // If Sunday, market opens on Monday
          nextOpen.setDate(nowIST.getDate() + 1);
        }
        nextOpen.setHours(9, 15, 0, 0);

        setMarketStatus("Market Closed");
        setTimeRemaining(`Opens in ${getTimeDifference(nowIST, nextOpen)}`);
      } else if (nowIST < openTime) {
        // Market is closed but will open today
        setMarketStatus("Market Closed");
        setTimeRemaining(`Opens in ${getTimeDifference(nowIST, openTime)}`);
      } else if (nowIST >= openTime && nowIST <= closeTime) {
        // Market is open
        setMarketStatus("Market Open");
        setTimeRemaining(`Closes in ${getTimeDifference(nowIST, closeTime)}`);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeDifference = (start, end) => {
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="animate-fadeIn text-center mt-10">
      <h1 className="text-2xl font-bold">{marketStatus}</h1>
      <p className="text-lg mt-2">{timeRemaining}</p>
    </div>
  );
}

export default Countdown;
