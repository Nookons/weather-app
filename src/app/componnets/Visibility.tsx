import React, {useEffect, useState} from 'react';
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {IWeatherData} from "@/app/types/weather";

const Visibility = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);

    const visibility = weather?.visibility || 0;

    const visibilityKm = visibility / 1000;
    const visibilityMiles = (visibility * 0.000621371).toFixed(2);



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
                <Image width={22} height={22} src="/ico/visibility_24dp.svg" alt=""/>
                Visibility
            </h1>
            <div className={"col-span-2"}>
                <div className={"p-1 flex justify-between border-b"}>
                    <h4 className={"text-gray-400"}>Mi</h4>
                    <h4>{visibilityMiles}</h4>
                </div>
                <div className={"p-1 flex justify-between border-b"}>
                    <h4 className={"text-gray-400"}>Km</h4>
                    <h4>{visibilityKm}</h4>
                </div>
            </div>
        </div>
    );
};

export default Visibility;