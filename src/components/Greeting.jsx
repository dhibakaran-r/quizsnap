import React, { useState, useEffect } from "react";
import { FiSunrise, FiSunset, FiSun, FiMoon } from "react-icons/fi";

const Greeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  });

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = daysOfWeek[currentTime.getDay()];
  const month = months[currentTime.getMonth()];
  const date = currentTime.getDate();
  const year = currentTime.getFullYear();

  const getGreeting = () => {
    const hours = currentTime.getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
      greeting = <p className="flex items-center gap-4"><FiSunrise className=""/>Good Morning !</p>;
    } else if (hours >= 12 && hours < 16) {
      greeting = <p className="flex items-center gap-4"><FiSun className="slowSpin"/>Good Afternoon !</p>;
    } else if (hours >= 17 && hours < 20) {
      greeting = <p className="flex items-center gap-4"><FiSunset/>Good Evening !</p>;
    } else {
      greeting = <p className="flex items-center gap-4"><FiMoon/>Good Night !</p>;
    }

    return greeting;
  };

  return (
    <div className="w-full flex justify-between">
      <div className=" px-4 py-2 text-2xl text-primlight bg-bgwhite border-t border-l border-r border-shadbg rounded-3xl shadow-lg shadow-shadbg ">{getGreeting()}</div>
      <div className=" flex gap-12 mr-4 text-textgray">
        <div className="flex flex-col">
          <p>{day}, {month} {date}, {year}</p>  
          <p>{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default Greeting;