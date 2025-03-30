import React, {useEffect, useState} from 'react';
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import {kelvinToCelsius} from "@/app/utils/kelvinToCelsius";


const Forecast = () => {
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

    return (
        <div
            className="bg-white/30 col-span-2 grid grid-cols-6 align-middle justify-center w-full p-4 rounded-xl backdrop-blur-lg shadow-lg w-96">
            <div className={"text-center flex flex-col align-middle"}>
                <h4>Now</h4>
                <img className={"p-2 fill-amber-200 md:max-w-[90px] md:m-auto w-full"} src="/ico/cloud_24dp.svg" alt=""/>
                <h4 className={"md:text-4xl"}>{kelvinToCelsius(weather?.main.temp || 0)}</h4>
            </div>
            <div className={"text-center flex flex-col align-middle"}>
                <h4>12 <span className={"text-xs"}>PM</span></h4>
                <img className={"p-2 md:max-w-[90px] md:m-auto w-full"} src="/ico/cloud_24dp.svg" alt=""/>
                <h4 className={"md:text-4xl"}>{kelvinToCelsius(weather?.main.temp || 0)}</h4>
            </div>
            <div className={"text-center flex flex-col align-middle"}>
                <h4>1 <span className={"text-xs"}>PM</span></h4>
                <img className={"p-2 md:max-w-[90px] md:m-auto w-full"} src="/ico/cloud_24dp.svg" alt=""/>
                <h4 className={"md:text-4xl"}>{kelvinToCelsius(weather?.main.temp || 0)}</h4>
            </div>
            <div className={"text-center flex flex-col align-middle"}>
                <h4>2 <span className={"text-xs"}>PM</span></h4>
                <img className={"p-2 md:max-w-[90px] md:m-auto w-full"} src="/ico/cloud_24dp.svg" alt=""/>
                <h4 className={"md:text-4xl"}>{kelvinToCelsius(weather?.main.temp || 0)}</h4>
            </div>
            <div className={"text-center flex flex-col align-middle"}>
                <h4>3 <span className={"text-xs"}>PM</span></h4>
                <img className={"p-2 md:max-w-[90px] md:m-auto w-full"} src="/ico/cloud_24dp.svg" alt=""/>
                <h4 className={"md:text-4xl"}>{kelvinToCelsius(weather?.main.temp || 0)}</h4>
            </div>
            <div className={"text-center flex flex-col align-middle"}>
                <h4>4 <span className={"text-xs"}>PM</span></h4>
                <img className={"p-2 md:max-w-[90px] md:m-auto w-full"} src="/ico/cloud_24dp.svg" alt=""/>
                <h4 className={"md:text-4xl"}>{kelvinToCelsius(weather?.main.temp || 0)}</h4>
            </div>
        </div>

    );
};

export default Forecast;