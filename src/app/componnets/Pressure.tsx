import React from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {useAppSelector} from "@/app/hooks/storeHooks";

const Pressure = () => {
    const {weather, loading} = useAppSelector(state => state.weather)

    const pressure_hPa = weather?.main.pressure || 0;
    const pressure_inHg = (pressure_hPa * 0.02953).toFixed(2);


    if (loading || !weather) {
        return <Skeleton height={156} />
    }

    return (
        <div className="bg-white/30 w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}>
                <Image width={22} height={22} src="/ico/swap_driving_apps_wheel_24dp.svg" alt=""/>
                Pressure
            </h1>
            <div className={"flex  flex-col justify-start align-middle"}>
                <h4 className={"text-4xl"}>
                    {pressure_inHg}
                </h4>
                <p className={"text-md text-indigo-400"}>inHg</p>
            </div>
        </div>
    );
};

export default Pressure;