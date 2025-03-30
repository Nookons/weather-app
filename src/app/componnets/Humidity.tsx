import React, {useEffect, useState} from 'react';
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {IWeatherData} from "@/app/types/weather";

const Humidity = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);

    useEffect(() => {
        const updateWeatherAndUserData = () => {
            const storedWeather = getWeatherFromLocalStorageSimple();

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
        return <Skeleton height={40} />
    }
    return (
        <div className="bg-white/30 w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}>
                <Image width={22} height={22} src="/ico/humidity_percentage_24dp.svg" alt=""/>
                Humidity
            </h1>
            <h4 className={"text-4xl mt-2"}>{weather.main.humidity} %</h4>
        </div>
    );
};

export default Humidity;