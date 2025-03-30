import React, {useEffect, useState} from 'react';
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {IWeatherData} from "@/app/types/weather";

const getWindDirection = (deg: number) => {
    if (deg >= 337.5 || deg < 22.5) return "N";
    if (deg >= 22.5 && deg < 67.5) return "NE";
    if (deg >= 67.5 && deg < 112.5) return "E";
    if (deg >= 112.5 && deg < 157.5) return "SE";
    if (deg >= 157.5 && deg < 202.5) return "S";
    if (deg >= 202.5 && deg < 247.5) return "SW";
    if (deg >= 247.5 && deg < 292.5) return "W";
    if (deg >= 292.5 && deg < 337.5) return "NW";
};

const Wind = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);

    const speed = weather?.wind.speed || 0
    const deg = weather?.wind.deg || 0

    const speedInMph = speed * 2.23694; // скорость в милях в час

    const direction = getWindDirection(deg);

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
        return <Skeleton height={40}/>
    }

    return (
        <div className="bg-white/30 col-span-2 w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}>
                <Image width={22} height={22} src="/ico/airwave_24dp.svg" alt=""/>
                Wind
            </h1>
            <div className={"grid mt-2 grid-cols-3 gap-2"}>
                <div className={"col-span-2"}>
                    <div className={"p-1 flex justify-between border-b"}>
                        <h4 className={"text-gray-400"}>Wind</h4>
                        <h4>{speedInMph.toFixed()} mph</h4>
                    </div>
                    <div className={"p-1 flex justify-between border-b"}>
                        <h4 className={"text-gray-400"}>Direction</h4>
                        <h4>{deg.toFixed()} {direction}</h4>
                    </div>
                </div>
                <div className="flex justify-center w-full h-full items-center">
                    <div className="relative w-full h-full rounded-full flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                width={22}
                                height={22}
                                style={{transform: `rotate(${deg}deg)`}} // Поворот стрелки в зависимости от угла
                                className="w-16 transition duration-500 ease-in-out"
                                src="/ico/keyboard_double_arrow_down_24dp.svg"
                                alt="Wind direction"
                            />
                        </div>

                        <div
                            className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 text-lg font-semibold">{direction}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wind;