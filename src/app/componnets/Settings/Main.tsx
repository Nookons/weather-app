import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import clsx from "clsx";

interface IUser_data {
    create_time?: number;
    time_type?: string;
    degrees_format?: string;
}

const Main = () => {
    const [theme, setTheme] = useState("light");
    const [user_settings, setUser_settings] = useState<IUser_data | null>(null);

    const [time_type, setTime_type] = useState("HH");

    const toggleSwitchTime = () => {
        const newTimeType = time_type === "HH" ? "hh" : "HH";
        setTime_type(newTimeType);

        const updatedSettings = { ...user_settings, time_type: newTimeType };
        setUser_settings(updatedSettings);

        localStorage.setItem("user_data", JSON.stringify(updatedSettings));
    };

    useEffect(() => {
        const data = localStorage.getItem("user_data");

        if (data) {
            const parsedData = JSON.parse(data);
            setUser_settings(parsedData);
            setTime_type(parsedData.time_type || "HH");
        } else {
            const initialSettings = { create_time: dayjs().valueOf(), time_type: "HH", degrees_format: "C" };
            setUser_settings(initialSettings);
            setTime_type("HH");
            localStorage.setItem("user_data", JSON.stringify(initialSettings));
        }
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    if (!user_settings) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"flex flex-col justify-between h-full"}>
            <div className={"grid grid-cols-2 gap-4"}>
                <div className={clsx("col-span-2 transition p-4 rounded-2xl", theme !== "light" ? "bg-gray-800" : "bg-gray-100")}>
                    <p className={`p-2 rounded`}>
                        I created this page using the free <a href="https://openweathermap.org/api"
                                                              className={"text-indigo-600"}>OpenWeather</a> API, so it
                        doesn&apost have all the latest features. I made it to show off my development skills!
                    </p>
                </div>
                <div
                    className={clsx("col-span-2 transition p-4 rounded-2xl", theme !== "light" ? "bg-gray-800" : "bg-gray-100")}>
                    <div className={'flex justify-between'}>
                        <h1>{theme !== "light" ? 'Dark' : 'Light'}</h1>
                        <button
                            onClick={toggleTheme}
                            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${theme === "light" ? 'bg-blue-500' : 'bg-gray-300'}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out ${theme === "light" ? 'translate-x-6' : ''}`}
                            />
                        </button>
                    </div>
                    <p className={"text-xs border-t mt-2 pt-2"}>This options no need to save</p>
                </div>

                <div
                    className={clsx("flex justify-between align-middle transition p-4 rounded-2xl", theme !== "light" ? "bg-gray-800" : "bg-gray-100")}>
                    <h1>{time_type !== "HH" ? '12 Hours' : '24 Hours'}</h1>
                    <button
                        onClick={toggleSwitchTime}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${time_type === "HH" ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out ${time_type === "HH" ? 'translate-x-6' : ''}`}
                        />
                    </button>
                </div>
            </div>
            <div>
                <p className={`text-center text-gray-800 `}>That page was powered by <a
                    href={"https://github.com/Nookons"}
                    className={"text-indigo-600 font-bold cursor-pointer"}>Nookon</a></p>
            </div>
        </div>
    );
};

export default Main;
