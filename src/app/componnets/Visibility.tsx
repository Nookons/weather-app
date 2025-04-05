import React from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import Image from 'next/image'
import {useAppSelector} from "@/app/hooks/storeHooks";

const Visibility = () => {
    const {weather, loading} = useAppSelector(state => state.weather)

    const visibility = weather?.visibility || 0;

    const visibilityKm = visibility / 1000;
    const visibilityMiles = (visibility * 0.000621371).toFixed(2);

    if (loading || !weather) {
        return <Skeleton height={156} />
    }

    return (
        <div className="bg-white/30 w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}>
                <Image width={22} height={22} src="/ico/visibility_24dp.svg" alt=""/>
                Visibility
            </h1>
            <div className={"col-span-2"}>
                <div className={"p-1 flex justify-between border-b"}>
                    <h4 className={"text-gray-400"}>Mi</h4>
                    <h4>{visibilityMiles}</h4>
                </div>
                <div className={"p-1 flex justify-between border-b"}>
                    <h4 className={"text-gray-400"}>Km</h4>
                    <h4>{visibilityKm}</h4>
                </div>
            </div>
        </div>
    );
};

export default Visibility;