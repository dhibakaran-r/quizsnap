import React, { useState, useEffect } from "react";
import { FiSunrise, FiSunset, FiSun, FiMoon } from "react-icons/fi";
import { userName } from "../service/dataStorage";
import { UserDataAPI } from "../service/Api";
import { isAuthenticated } from "../service/Auth";

const Greeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState({ name: "", email: "", uid: "" });

  useEffect(() => {
    if (isAuthenticated()) {

      UserDataAPI().then((res) => {

        setUserData({ name: res.data.users[0].displayName, email: res.data.users[0].email, uid: res.data.users[0].localId });

      }).catch((err) => {

      }).finally(() => {

      })
    }
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
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = daysOfWeek[currentTime.getDay()];
  const month = months[currentTime.getMonth()];
  const date = currentTime.getDate();
  const year = currentTime.getFullYear();

  const getGreeting = () => {
    const hours = currentTime.getHours();
    // console.log(hours)
    let greeting;

    if (hours >= 5 && hours < 12) {
      greeting = <p className="flex items-center gap-2 md:gap-4"><FiSunrise className="" />Good Morning</p>;
    } else if (hours >= 12 && hours < 17) {
      greeting = <p className="flex items-center gap-2 md:gap-4"><FiSun className="slowSpin" />Good Afternoon</p>;
    } else if (hours >= 17 && hours < 20) {
      greeting = <p className="flex items-center gap-2 md:gap-4"><FiSunset />Good Evening</p>;
    } else {
      greeting = <p className="flex items-center gap-2 md:gap-4"><FiMoon />Good Night</p>;
    }

    return greeting;
  };
  // console.log(userName);

  return (
    <div className=" w-full flex justify-around items-center md:px-16 flex-row md:justify-between">
      
      <div className="w-60 md:w-auto">
        <p className=" text-lg md:text-3xl text-primlight">Welcome {userData.name}!</p>
      </div>
      {/* <div className=""> */}

        <div className=" w-80 lg:w-96 flex flex-col items-center justify-center gap-4 px-4 py-2  text-primlight bg-bgwhite border-t border-l border-r border-shadbg rounded-3xl shadow-lg shadow-shadbg ">
          <div className="text-sm md:text-2xl">
            {getGreeting()}
          </div>
          <div className="flex flex-col text-[12px] md:text-lg text-lggray">
            <span>{day} - {month} {date} - {year}</span>
            <span>{formattedTime}</span>
          </div>
        </div>

      {/* </div> */}

    </div>
  );
};

export default Greeting;