import React, {useEffect, useState} from 'react';
import {kelvinToCelsius} from "@/app/utils/kelvinToCelsius";
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import Skeleton from "@/app/componnets/Skeleton";
import {kelvinToFahrenheit} from "@/app/utils/kelvinToFahrenheit";
import Image from 'next/image'
import {IWeatherData} from "@/app/types/weather";

function getDescription(weather: IWeatherData, deg_format: string) {
    const tempMin = weather.main.temp_min;
    const feelsLike = weather.main.feels_like;

    const difference = tempMin - feelsLike;

    const roundedWindChill = deg_format === "F"
        ? Math.round(difference * 9/5)  // Преобразуем разницу в °F
        : Math.round(difference);       // Оставляем в °C

    if (difference < 0) {
        return `Feels ${Math.abs(roundedWindChill)}° more without wind`;
    } else {
        return `Wind is making it feel cooler by ${roundedWindChill}°`;
    }
}


const Feels = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);
    const [deg_format, setDeg_format] = useState<"C" | "F">("C")
    const feels = deg_format !== "C" ? kelvinToFahrenheit(weather?.main.feels_like || 0) : kelvinToCelsius(weather?.main.feels_like || 0)
    const current = deg_format !== "C" ? kelvinToFahrenheit(weather?.main.temp || 0): kelvinToCelsius(weather?.main.temp || 0)



    useEffect(() => {
        const updateWeatherAndUserData = () => {
            const user_data = localStorage.getItem("user_data");
            const storedWeather = getWeatherFromLocalStorageSimple();

            if (user_data) {
                const parsedUserData = JSON.parse(user_data); // Преобразуем в объект
                setDeg_format(parsedUserData.degrees_format); // Обновляем формат градусов
            }

            if (storedWeather) {
                setWeather(storedWeather); // Обновляем данные о погоде
            }
        };

        // Инициализируем начальные данные
        updateWeatherAndUserData();

        // Устанавливаем интервал для проверки изменений каждые 1000 мс (1 секунда)
        const intervalId = setInterval(() => {
            updateWeatherAndUserData();
        }, 1000);

        // Очистка интервала при размонтировании компонента
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (!weather) {
        return <Skeleton height={40} />
    }

    return (
        <div className="bg-white/30 w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}><Image width={22} height={22} src="/ico/device_thermostat_24dp.svg" alt=""/> Feels Like</h1>
            <h4 className={"text-xl md:text-6xl mt-4"}>{feels}</h4>
            <h4 className={"text-indigo-400 md:text-2xl"}>Actual: {current}</h4>
            <p className={"text-xs"}>{getDescription(weather, deg_format)}</p>
        </div>
    );
};

export default Feels;