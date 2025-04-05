import React, {useEffect, useState} from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import dayjs from "dayjs";
import Image from 'next/image'
import {useAppSelector} from "@/app/hooks/storeHooks";

const Sunset = () => {
    const {weather, loading} = useAppSelector(state => state.weather)
    const [time_type, setTime_type] = useState("HH")

    const sunset = weather?.sys.sunset || 0
    const sunrise = weather?.sys.sunrise || 0

    const sunriseTime = dayjs.unix(sunrise).format(`${time_type}:mm A`);
    const sunsetTime = dayjs.unix(sunset).format(`${time_type}:mm A`);


    useEffect(() => {
        const updateUserData = () => {
            const user_data = localStorage.getItem("user_data");

            if (user_data) {
                const parsedUserData = JSON.parse(user_data); // Преобразуем в объект
                setTime_type(parsedUserData.time_type); // Обновляем формат градусов
            }
        };

        updateUserData();

        const intervalId = setInterval(() => {
            updateUserData();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);



    if (loading || !weather) {
        return <Skeleton height={156}/>
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