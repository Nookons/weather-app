import React from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import {useAppSelector} from "@/app/hooks/storeHooks";

const Temperature = () => {
    const {weather, loading} = useAppSelector(state => state.weather);

    if (loading || !weather) {
        return (
            <div className={"mt-2"}>
                <Skeleton height={252}/>
            </div>
        )
    }

    return (
        <div className={"bg-white/30 col-span-2 grid grid-cols-1 align-middle justify-center w-full p-4 rounded-xl backdrop-blur-lg shadow-lg w-96"}>
            <div>
                <h1 className={'text-center text-6xl my-2'}>{weather?.name}</h1>
                <h2 className={'text-8xl text-center my-2'}><>{weather.main.temp.toFixed()}°</>
                </h2>
            </div>
            <div>
                <h4 className={'text-2xl text-indigo-400 text-center my-2'}>
                    Feels like: {weather.main.feels_like.toFixed()}°
                </h4>
                <div className={"grid grid-cols-2 gap-4"}>
                    <h4 className={"text-right"}>H: {weather.main.temp_max.toFixed()}°</h4>
                    <h4 className={"text-left"}>L: {weather.main.temp_min.toFixed()}°</h4>
                </div>
            </div>
        </div>
    );
};

export default Temperature;