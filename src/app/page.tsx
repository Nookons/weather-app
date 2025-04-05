"use client";

import {useEffect} from "react";
import Temperature from "@/app/componnets/Temperature";
import Forecast from "@/app/componnets/Forecast";
import Feels from "@/app/componnets/Feels";
import Sunset from "@/app/componnets/Sunset";
import Wind from "@/app/componnets/Wind";
import Visibility from "@/app/componnets/Visibility";
import Humidity from "@/app/componnets/Humidity";
import Pressure from "@/app/componnets/Pressure";
import Header from "@/app/componnets/Header";
import {useAppDispatch} from "@/app/hooks/storeHooks";
import {subscribeToWeather} from "@/app/store/reducers/weather";
import {getUserLocation} from "@/app/utils/getUserLocation";
import {subscribeToForecast} from "@/app/store/reducers/forecast";


export default function Home() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchForecast = async () => {
            const coords = await getUserLocation();
            if (coords) {
                dispatch(subscribeToWeather(coords));
                dispatch(subscribeToForecast(coords));
            }
        };

        fetchForecast();
    }, [dispatch]);

    return (
        <div className="p-2">
            <Header />
            <Temperature />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4 auto-rows-auto">
                <Forecast />
                <Feels />
                <Sunset />
                <Wind />
                <Visibility />
                <Humidity />
                <Pressure />
            </div>
        </div>
    );
}

