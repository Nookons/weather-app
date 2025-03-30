import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import clsx from "clsx";

const Main = () => {
    const [theme, setTheme] = useState("light");
    const [user_settings, setUser_settings] = useState<any | null>(null);

    const [time_type, setTime_type] = useState("HH");
    const [degrees_format, setDegrees_format] = useState("C");
    const [speed_format, setSpeed_format] = useState("km");

    // Toggle Time Format
    const toggleSwitchTime = () => {
        const newTimeType = time_type === "HH" ? "hh" : "HH";
        setTime_type(newTimeType);

        const updatedSettings = { ...user_settings, time_type: newTimeType };
        setUser_settings(updatedSettings);

        localStorage.setItem("user_data", JSON.stringify(updatedSettings));
    };

    // Toggle Degrees Format
    const toggleSwitchDegrees = () => {
        const newDegreesType = degrees_format === "C" ? "F" : "C";
        setDegrees_format(newDegreesType);

        const updatedSettings = { ...user_settings, degrees_format: newDegreesType };
        setUser_settings(updatedSettings);

        localStorage.setItem("user_data", JSON.stringify(updatedSettings));
    };

    const toggleSwitchSpeed = () => {
        const newSpeedFormat = speed_format === "km" ? "mi" : "km";
        setSpeed_format(newSpeedFormat);

        const updatedSettings = { ...user_settings, speed_format: newSpeedFormat };
        setUser_settings(updatedSettings);

        localStorage.setItem("user_data", JSON.stringify(updatedSettings));
    };

    useEffect(() => {
        const data = localStorage.getItem("user_data");

        if (data) {
            const parsedData = JSON.parse(data);
            setUser_settings(parsedData);
            setTime_type(parsedData.time_type || "HH");
            setDegrees_format(parsedData.degrees_format || "C");
        } else {
            // Initial settings if no user data exists
            const initialSettings = { create_time: dayjs().valueOf(), time_type: "HH", degrees_format: "C" };
            setUser_settings(initialSettings);
            setTime_type("HH");
            setDegrees_format("C");
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

                <div
                    className={clsx("flex justify-between align-middle transition p-4 rounded-2xl", theme !== "light" ? "bg-gray-800" : "bg-gray-100")}>
                    <h1>{degrees_format !== "C" ? '° Fahrenheit' : '° Celsius'}</h1>
                    <button
                        onClick={toggleSwitchDegrees}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${degrees_format === "C" ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out ${degrees_format === "C" ? 'translate-x-6' : ''}`}
                        />
                    </button>
                </div>

                {/*<div
                    className={clsx("flex justify-between align-middle transition p-4 rounded-2xl", theme !== "light" ? "bg-gray-800" : "bg-gray-100")}>
                    <h1>
                        {speed_format === "km" ? 'Kilometers' : 'Miles'}
                    </h1>
                    <button
                        onClick={toggleSwitchSpeed}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${speed_format === "km" ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out ${speed_format === "km" ? 'translate-x-6' : ''}`}
                        />
                    </button>
                </div>*/}
            </div>
            <div>
                {/*<button
                    onClick={() => window.location.reload()}
                    className={"bg-indigo-600 text-white w-full p-4 rounded-2xl my-4 cursor-pointer shadow-2xl"}
                >
                    Save settings
                </button>*/}
                <p className={`text-center text-gray-800 `}>That page was powered by <a href={"https://github.com/Nookons"} className={"text-indigo-600 font-bold cursor-pointer"}>Nookon</a></p>
            </div>
        </div>
    );
};

export default Main;
