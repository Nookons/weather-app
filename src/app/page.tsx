"use client";

import {useEffect} from "react";
import dayjs from "dayjs";
import Temperature from "@/app/componnets/Temperature";
import Forecast from "@/app/componnets/Forecast";
import Feels from "@/app/componnets/Feels";
import Sunset from "@/app/componnets/Sunset";
import Wind from "@/app/componnets/Wind";
import Visibility from "@/app/componnets/Visibility";
import Humidity from "@/app/componnets/Humidity";
import Pressure from "@/app/componnets/Pressure";
import Header from "@/app/componnets/Header";
import {getUserLocation} from "@/app/utils/getUserLocation";
import {IWeatherData} from "@/app/types/weather";

function saveWeatherToLocalStorage(weatherData: IWeatherData) {
    const timestamp = dayjs().valueOf();
    const dataWithTime = {weatherData, get_time: timestamp};

    localStorage.setItem('weatherData', JSON.stringify(dataWithTime));
}

function getWeatherFromLocalStorage() {
    const weatherData = localStorage.getItem('weatherData');
    if (!weatherData) {
        return null; // Если данных нет в localStorage
    }

    const parsedData = JSON.parse(weatherData);
    const timestamp = parsedData.get_time; // Время сохранения данных
    const currentTime = dayjs(); // Текущее время с dayjs

    const timeDiff = currentTime.diff(dayjs(timestamp), 'minute');

    if (timeDiff > 5) {
        console.log('Data is too old, fetching new weather...');
        return null; // Данные старые, возвращаем null или делаем новый запрос
    }

    console.log('Returning weather data:', parsedData.weatherData);
    return parsedData.weatherData;
}

export default function Home() {

    useEffect(() => {
        const fetchWeather = async () => {
            const storedWeather = getWeatherFromLocalStorage();

            if (!storedWeather)  {
                try {
                    const weather_data = await getUserLocation();

                    if (weather_data) { // Проверяем, что данные получены
                        saveWeatherToLocalStorage(weather_data);
                    } else {
                        console.error("Ошибка: данные о погоде не получены");
                    }
                } catch (error) {
                    console.error("Ошибка при получении погоды:", error);
                }
            }
        };

        fetchWeather();
    }, []);



    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (!savedTheme) {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            localStorage.setItem("theme", systemTheme);
            document.body.classList.toggle("dark", systemTheme === "dark");
        }
    }, []);


    return (
        <div
            className="p-2"
        >
            <Header />
            <Temperature/>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4 auto-rows-auto">
                <Forecast/>
                <Feels/>
                <Sunset/>
                <Wind/>
                <Visibility />
                <Humidity />
                <Pressure />
            </div>
        </div>
    );
}
