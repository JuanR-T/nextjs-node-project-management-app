import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import { Menu, Moon, Settings, Sun, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed,
    );
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: currentUser } = useGetAuthUserQuery({});
    if (!currentUser) return null;
    const currentUserDetails = currentUser?.userDetails;
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error: any) {
            console.error('Failed to sign out:', error);
        }
    };
    return (
        <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
            {/* Search Bar */}
            <div className="flex items-center">
                <div className="flex items-center gap-8">
                    {!isSidebarCollapsed ? null : (
                        <button
                            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
                        >
                            <Menu className="h-8 w-8 dark:text-white" />
                        </button>
                    )}

                </div>
                <Link
                    href="https://github.com/JuanR-T"
                    target="_blank"
                    className={
                        isDarkMode
                            ? `h-full w-full text-slate-900 flex items-center rounded p-2 dark:hover:bg-gray-700 dark:text-white`
                            : `h-full w-full text-slate-900 flex items-center rounded p-2 hover:bg-gray-100 dark:text-white`
                    }
                >
                    <Image src="https://project-management-mind-hive-s3-images.s3.eu-west-3.amazonaws.com/github.svg"
                        alt="github-logo"
                        width={24}
                        height={24}
                        className="h-full filter invert-0 dark:invert"
                    />

                    <span className="px-2 font-bold">JuanR-T</span>
                </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center">
                <button
                    onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                    className={
                        isDarkMode
                            ? `rounded p-2 dark:hover:bg-gray-700`
                            : `rounded p-2 hover:bg-gray-100`
                    }
                >
                    {isDarkMode ? (
                        <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
                    ) : (
                        <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
                    )}
                </button>
                <Link
                    href="/settings"
                    className={
                        isDarkMode
                            ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
                            : `h-min w-min rounded p-2 hover:bg-gray-100`
                    }
                >
                    <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
                </Link>
                <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
                <div className="hidden items-center justify-between md:flex">
                    <div className="align-center flex h-9 w-9 justify-center">
                        {!!currentUserDetails?.profilePictureUrl ? (
                            <Image
                                src={`https://project-management-mind-hive-s3-images.s3.eu-west-3.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
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
                        className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;