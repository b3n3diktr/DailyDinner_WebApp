import React from "react";
import {DarkMode, LightMode} from "../../icons/icons";

let currentTheme = localStorage.getItem("theme");

const themeSwitch = document.getElementById("theme-switch");

const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    document.body.classList.remove("lightmode");
    localStorage.setItem("theme", "dark");
}

const enableLightMode = () => {
    document.body.classList.add("lightmode");
    document.body.classList.remove("darkmode");
    localStorage.setItem("theme", "light");
}

if (currentTheme === "dark") {
    enableDarkMode();
} else if (currentTheme === "light") {
    enableLightMode();
} else {
    // Default to light mode if no theme is set
    enableLightMode();
}

export const handleThemeSwitch = () => {
    currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

const DarkmodeButton = () =>{
    return (
        <div>
            <button id="theme-switch" onClick={handleThemeSwitch}>
                {DarkMode()}
                {LightMode()}
            </button>
        </div>
    );
}

export default DarkmodeButton;