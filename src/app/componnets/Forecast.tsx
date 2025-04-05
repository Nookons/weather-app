import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import {useAppSelector} from "@/app/hooks/storeHooks";
import Skeleton from "@/app/componnets/Skeleton";
import dayjs from "dayjs";
import {IForecastItem} from "@/app/types/forecast";

const Forecast = () => {
    const {forecast, loading} = useAppSelector(state => state.forecast)

    const [filtered_data, setFiltered_data] = useState<IForecastItem[]>([])
    const [view_value, setView_value] = useState<number>(3)

    useEffect(() => {
        if (forecast && forecast.list) {
            const groupedData = forecast.list.reduce<{ [key: string]: IForecastItem }>((acc, item) => {
                const itemDate = dayjs.unix(item.dt).format('YYYY-MM-DD'); // Форматируем дату до года-месяца-дня
                if (!acc[itemDate]) {
                    acc[itemDate] = item; // Если такого дня еще нет, добавляем объект
                }
                return acc;
            }, {});

            const filteredData = Object.values(groupedData); // Получаем только значения из группированного объекта
            setFiltered_data(filteredData);
        }
    }, [forecast]);

    if (loading || !forecast) {
        return (
            <div className={"col-span-2"}>
                <Skeleton height={258} />
            </div>
        )
    }

    return (
        <div
            className="bg-white/30 col-span-2 grid grid-cols-1 align-middle justify-center w-full p-4 rounded-xl backdrop-blur-lg shadow-lg w-96"
        >
            <h1 className={"flex justify-start gap-2 align-middle text-nowrap pb-4"}>
                <Image width={22} height={22} src="/ico/nature_people_24dp.svg" alt=""/>
                Forecast
            </h1>
            <hr/>

            <ul role="list" className="divide-y divide-gray-100">
                {filtered_data.slice(0, view_value).map((item) => {
                    const date = dayjs.unix(item.dt);

                    const iconCode = item.weather[0].icon; // Получаем код иконки из данных
                    const description = item.weather[0].description; // Получаем описание погоды

                    return (
                        <li key={item.dt_txt} className="grid grid-cols-4 align-middle justify-center">
                            <div className={'flex justify-start items-center'}> {/* Добавим items-center */}
                                <p className={"inline"}>{date.format("ddd")}</p>
                            </div>
                            <Image
                                src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}  // Используем 4x для высококачественной иконки
                                alt={description}
                                width={50}  // Можете настроить размеры под 4x
                                height={50}
                            />

                            <div className={"col-span-2 grid grid-cols-6 gap-2 max-w-full items-center"}>
                                <p className={'text-left'}>{item.main.temp_min.toFixed()}°</p>

                                <div className="flex-grow col-span-4 flex justify-center">
                                    <div className="w-full bg-gray-200 h-2 rounded-2xl">
                                        <div
                                            className="bg-blue-500 h-full rounded-2xl"
                                            style={{
                                                width: `${((item.main.temp_max - (item.main.temp_min - 10)) / (item.main.temp_max + 10 - (item.main.temp_min - 10)) * 100).toFixed(0)}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <p className={'text-right'}>{item.main.temp_max.toFixed()}°</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={"w-full"}>
                {view_value === 3
                    ? <button onClick={() => setView_value(9)} className={"w-full flex justify-center align-middle border-t pt-2"}>
                        <Image
                            src={`/ico/more_horiz_24dp.svg`}
                            alt={"More ico"}
                            width={24}
                            height={24}
                        />
                    </button>
                    : <button onClick={() => setView_value(3)}
                              className={"w-full flex justify-center align-middle border-t pt-2"}>
                        <Image
                            src={`/ico/hide_24dp.svg`}
                            alt={"More ico"}
                            width={24}
                            height={24}
                        />
                    </button>
                }
            </div>
        </div>

    );
};

export default Forecast;