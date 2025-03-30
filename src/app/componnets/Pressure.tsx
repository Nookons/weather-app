import React, {useEffect, useState} from 'react';
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {IWeatherData} from "@/app/types/weather";

const Pressure = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);

    const pressure_hPa = weather?.main.pressure || 0;
    const pressure_inHg = (pressure_hPa * 0.02953).toFixed(2);

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
                <Image width={22} height={22} src="/ico/swap_driving_apps_wheel_24dp.svg" alt=""/>
                Pressure
            </h1>
            <div className={"flex  flex-col justify-start align-middle"}>
                <h4 className={"text-4xl flex justify-start align-bottom gap-2"}>
                    {pressure_inHg}
                    <Image width={22} height={22} className={"w-5 transform: -translate-y-[-8px]"} src="/ico/arrow_downward_24dp.svg" alt=""/>
                </h4>
                <p className={"text-md text-indigo-400"}>inHg</p>
            </div>
        </div>
    );
};

export default Pressure;