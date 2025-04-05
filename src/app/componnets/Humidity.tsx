import React from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {useAppSelector} from "@/app/hooks/storeHooks";

const Humidity = () => {
    const {weather, loading} = useAppSelector(state => state.weather)

    if (loading || !weather) {
        return <Skeleton height={156} />
    }

    return (
        <div className="bg-white/30 w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}>
                <Image width={22} height={22} src="/ico/humidity_percentage_24dp.svg" alt=""/>
                Humidity
            </h1>
            <h4 className={"text-4xl mt-2"}>{weather.main.humidity} %</h4>
        </div>
    );
};

export default Humidity;