import React, {useEffect, useState} from 'react';
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import Skeleton from "@/app/componnets/Skeleton";
import dayjs from "dayjs";
import Image from 'next/image'
import {IWeatherData} from "@/app/types/weather";

const Sunset = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);

    const [time_type, setTime_type] = useState("HH")

    const sunset = weather?.sys.sunset || 0
    const sunrise = weather?.sys.sunrise || 0

    const sunriseTime = dayjs.unix(sunrise).format(`${time_type}:mm A`);
    const sunsetTime = dayjs.unix(sunset).format(`${time_type}:mm A`);


    useEffect(() => {
        const updateWeatherAndUserData = () => {
            const user_data = localStorage.getItem("user_data");
            const storedWeather = getWeatherFromLocalStorageSimple();

            if (user_data) {
                const parsedUserData = JSON.parse(user_data); // Преобразуем в объект
                setTime_type(parsedUserData.time_type); // Обновляем формат градусов
            }

            if (storedWeather) {
                setWeather(storedWeather); // Обновляем данные о погоде
            }
        };

        updateWeatherAndUserData();

        const intervalId = setInterval(() => {
            updateWeatherAndUserData();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);



    if (!weather) {
        return <Skeleton height={40}/>
    }

    return (
        <div className="bg-white/30 flex flex-col justify-start w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-between gap-2 align-middle text-nowrap"}>
                <div className={"flex justify-center align-middle gap-2"}>
                    <Image width={22} height={22} src="/ico/wb_twilight_24dp.svg" alt=""/>
                    SunSet
                </div>
            </h1>
            <h4 className={"text-2xl md:text-6xl mt-4"}>
                {sunsetTime.slice(0, 5)}
                {time_type == "HH" || (<span className={"text-xs ml-1"}>PM</span>)}
            </h4>
            <h4 className={"text-indigo-400 md:text-xl"}>Sunrise: {sunriseTime.slice(0, 5)}
                {time_type == "HH" || (<span className={"text-xs ml-1"}>AM</span>)}
            </h4>
        </div>
    );
};

export default Sunset;