import React, { useState, useEffect } from "react";
import { DarkMode, LightMode } from "../../icons/icons";

const getDarkmode = (): boolean => {
    return localStorage.getItem("darkmode") === "true";
};

const enableDarkMode = () => {
    localStorage.setItem("darkmode", "true");
    document.documentElement.classList.add("dark");
};

const enableLightMode = () => {
    localStorage.setItem("darkmode", "false");
    document.documentElement.classList.remove("dark");
};

const handleThemeSwitch = () => {
    const darkmode = getDarkmode();
    darkmode ? enableLightMode() : enableDarkMode();
};

const loadDarkMode = () => {
    const darkmode = getDarkmode();
    darkmode ? enableDarkMode() : enableLightMode();
};

loadDarkMode();

const DarkmodeButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(getDarkmode());

    const toggleTheme = () => {
        handleThemeSwitch();
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        setIsDarkMode(getDarkmode());
    }, []);

    return (
        <div>
            <button
                id="theme-switch-button"
                onClick={toggleTheme}
                className={"h-12 w-12 p-0 rounded-full border-0 dark:bg-darkmode-base-variant bg-green-600 fixed bottom-5 right-5 flex justify-center items-center z-10 shadow-lg transition-colors duration-300"}
            >
                <div className={`${isDarkMode ? 'fill-white' : 'fill-black'} transition-colors duration-300`}>
                    {isDarkMode ? <DarkMode /> : <LightMode />}
                </div>
            </button>
        </div>
    );
};

export default DarkmodeButton;
