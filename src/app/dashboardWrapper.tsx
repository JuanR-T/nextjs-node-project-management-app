"use client";

import Navbar from "@/app/(components)/Navbar/index";
import Sidebar from "@/app/(components)/Sidebar/index";
import { useEffect } from "react";
import StoreProvider, { useAppSelector } from "./redux";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    });

    return (
        <div className="flex min-h-screen w-full bg-gray-50 text-gray-500">
            <Sidebar />
            <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? "" : "md:pl-64"}`}>
                <Navbar />
                {children}
            </main>
        </div >
    );
}

export const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </StoreProvider>
    );
}