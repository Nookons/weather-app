'use client'
import React, {useState} from 'react';
import Skeleton from "@/app/componnets/Skeleton";
import Main from "@/app/componnets/Settings/Main";
import Image from 'next/image'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {useAppSelector} from "@/app/hooks/storeHooks";

const Header = () => {
    const [open, setOpen] = useState(false)
    const {weather, loading} = useAppSelector(state => state.weather)


    if (loading || !weather) {
        return <Skeleton height={56} />
    }


    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative overflow-hidden z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity duration-250 ease-in-out data-closed:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <DialogPanel
                                transition
                                className="pointer-events-auto relative w-screen max-w-full md:max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                            >

                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div className="px-4 sm:px-6">
                                        <DialogTitle className="text-base flex justify-end align-middle gap-2 font-semibold text-gray-900">
                                            <h4>Close</h4>
                                            <Image width={22} height={22} className={"cursor-pointer"} onClick={() => setOpen(false)} src="/ico/disabled_by_default_24dp.svg" alt=""/>
                                        </DialogTitle>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        <Main />
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
            <div
                className="bg-white/30 flex justify-between align-middle w-full p-4 rounded-xl backdrop-blur-lg shadow-lg">
                <h1 className={"flex justify-start gap-2 align-middle text-nowrap"}>
                    <Image width={22} height={22} src="/ico/humidity_percentage_24dp.svg" alt=""/>
                    {weather.name} {weather.sys.country}
                </h1>
                <button onClick={() => setOpen(true)}>
                    <Image width={22} height={22} className={"bg-transparent rounded cursor-pointer transition  hover:bg-sky-100"}
                         src="/ico/tune_24dp.svg" alt="Settings ico"/>
                </button>
            </div>
        </>
    );
};

export default Header;