import React from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {IWeatherData} from "@/app/types/weather";
import {useAppSelector} from "@/app/hooks/storeHooks";

function getDescription(weather: IWeatherData) {
    const tempMin = weather.main.temp_min;
    const feelsLike = weather.main.feels_like;

    const difference = tempMin - feelsLike;
    const fixed = Number(difference.toFixed())

    if (difference < 0) {
        return `Feels ${Math.abs(fixed)}° more without wind`;
    } else {
        return `Wind is making it feel cooler by ${Math.abs(fixed)}°`;
    }
}


const Feels = () => {
    const {weather, loading} = useAppSelector(state => state.weather)

    if (loading || !weather) {
        return <Skeleton height={156} />
    }

    return (
        <div className="bg-white/30 w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}><Image width={22} height={22} src="/ico/device_thermostat_24dp.svg" alt=""/> Feels Like</h1>
            <h4 className={"text-xl md:text-6xl mt-4"}>{weather.main.feels_like.toFixed()}</h4>
            <h4 className={"text-indigo-400 md:text-2xl"}>Actual: {weather.main.temp.toFixed()}</h4>
            <p className={"text-xs"}>{getDescription(weather)}</p>
        </div>
    );
};

export default Feels;