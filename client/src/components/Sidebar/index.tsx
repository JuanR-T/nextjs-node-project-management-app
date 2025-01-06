"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Layers3, LayoutDashboard, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);

    const { data: projects } = useGetProjectsQuery();
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed,
    );
    const { data: currentUser } = useGetAuthUserQuery({});
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };
    if (!currentUser) return null;
    const currentUserDetails = currentUser?.userDetails;
    const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

    return (
        <div className={sidebarClassNames}>
            <div className="flex h-[100%] w-full flex-col justify-start">

                <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-3 pt-3 dark:bg-black border-y-[1.5px] border-gray-200 py-4 dark:border-gray-700">
                    <Image src="https://project-management-mind-hive-s3-images.s3.eu-west-3.amazonaws.com/logo.svg" alt="Logo" width={60} height={60} className="filter invert-0 dark:invert"></Image>
                    <div className="text-sm font-bold text-gray-800 dark:text-white">
                        Management Hub
                    </div>
                    {isSidebarCollapsed ? null :
                        <button className="py-3" onClick={() => { dispatch(setIsSidebarCollapsed(!isSidebarCollapsed)) }}>
                            <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
                        </button>
                    }
                </div>

                {/**Links */}
                <nav className="z-10 w-full">
                    <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
                    <SidebarLink href="/search" icon={Search} label="Search" />
                    <SidebarLink href="/settings" icon={Settings} label="Settings" />
                    <SidebarLink href="/users" icon={User} label="Users" />
                    <SidebarLink href="/teams" icon={Users} label="Teams" />
                </nav>

                <button className="flex w-full items-center justify-between px-8 py-3 text-gray-500" onClick={() => setShowPriority((prev) => !prev)}>
                    <span className="">Priority</span>
                    {showPriority ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {/**Priority links*/}
                {showPriority && (
                    <>
                        <SidebarLink href="/priority/urgent" icon={AlertCircle} label="Urgent" />
                        <SidebarLink href="/priority/high" icon={ShieldAlert} label="High" />
                        <SidebarLink href="/priority/medium" icon={AlertTriangle} label="Medium" />
                        <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
                        <SidebarLink href="/priority/backlog" icon={Layers3} label="Backlog" />
                    </>
                )}
                {/**Projects links*/}
                <button className="flex w-full items-center justify-between px-8 py-3 text-gray-500" onClick={() => setShowProjects((prev) => !prev)}>
                    <span className="">Projects</span>
                    {showProjects ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {showProjects && projects?.map((project) => (
                    <SidebarLink key={project.id} href={`/projects/${project.id}/${project.name}`} icon={Briefcase} label={project.name} />
                ))};
                <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
                    <div className="flex w-full items-center">
                        <div className="align-center flex h-9 w-9 justify-center">
                            {!!currentUserDetails?.profilePictureUrl ? (
                                <Image
                                    src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                                    alt={currentUserDetails?.username || "User Profile Picture"}
                                    width={100}
                                    height={50}
                                    className="h-full rounded-full object-cover"
                                />
                            ) : (
                                <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
                            )}
                        </div>
                        <span className="mx-3 text-gray-800 dark:text-white">
                            {currentUserDetails?.username}
                        </span>
                        <button
                            className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
                            onClick={handleSignOut}
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
};

const SidebarLink = ({
    href,
    icon: Icon,
    label,
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");
    const screenWidth = window.innerWidth;

    return (
        <Link href={href} className="w-full">
            <div
                className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
                    } justify-start px-8 py-3`}
            >
                {isActive && (
                    <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
                )}

                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                    {label}
                </span>
            </div>
        </Link>
    )
};

export default Sidebar;