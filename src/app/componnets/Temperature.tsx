import React, {useEffect, useState} from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import SkeletonText from "@/app/componnets/SkeletonText";
import {getWeatherFromLocalStorageSimple} from "@/app/utils/getWeather";
import {kelvinToCelsius} from "@/app/utils/kelvinToCelsius";
import {kelvinToFahrenheit} from "@/app/utils/kelvinToFahrenheit";

const Temperature = () => {
    const [weather, setWeather] = useState<IWeatherData | null>(null);
    const [deg_format, setDeg_format] = useState<"C" | "F">("C")


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




    return (
        <div className={"grid sm:grid-cols-2"}>
            <div>
                <h1 className={'text-center text-6xl my-2'}>{weather?.name}</h1>
                {weather?.main.temp
                    ? <h2 className={'text-8xl text-center my-2'}>
                        {deg_format === "C"
                            ? (<>{kelvinToCelsius(weather.main.temp)}</>)
                            : (<>{kelvinToFahrenheit(weather.main.temp)}</>)
                        }
                    </h2>
                    : <Skeleton height={40}/>
                }
            </div>
            <div>
                {weather?.main.feels_like
                    ? <>
                        <h4 className={'text-2xl text-indigo-400 text-center my-2'}>
                            Feels like:
                            {deg_format === "C"
                                ? (<>{kelvinToCelsius(weather.main.feels_like)}</>)
                                : (<>{kelvinToFahrenheit(weather.main.feels_like)}</>)
                            }
                        </h4>
                    </>
                    : <Skeleton height={10}/>
                }
                <div className={"grid grid-cols-2 gap-4"}>
                    {weather?.main.temp_max
                        ? <h4 className={"text-right"}>H:
                            {deg_format === "C"
                                ? (<>{kelvinToCelsius(weather.main.temp_max)}</>)
                                : (<>{kelvinToFahrenheit(weather.main.temp_max)}</>)
                            }
                        </h4>
                        : <SkeletonText/>
                    }
                    {weather?.main.temp_min
                        ? <h4 className={"text-left"}>L:
                            {deg_format === "C"
                                ? (<>{kelvinToCelsius(weather.main.temp_min)}</>)
                                : (<>{kelvinToFahrenheit(weather.main.temp_min)}</>)
                            }
                        </h4>
                        : <SkeletonText/>
                    }
                </div>
            </div>
        </div>
    );
};

export default Temperature;