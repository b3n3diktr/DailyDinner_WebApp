import React, { useState, useEffect } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemeMode = 'system' | 'dark' | 'light';

const getDarkmode = (): ThemeMode => {
    return (localStorage.getItem("theme") as ThemeMode) || 'system';
};

const setTheme = (mode: ThemeMode) => {
    if (mode === 'system') {
        localStorage.removeItem("theme");
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    } else if (mode === 'dark') {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
    } else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
    }
};

const DarkmodeButton = () => {
    const [theme, setThemeState] = useState<ThemeMode>(getDarkmode());

    useEffect(() => {
        const savedTheme = getDarkmode();
        setTheme(savedTheme); // Apply the theme immediately
        setThemeState(savedTheme); // Sync state with stored theme

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (savedTheme === 'system') {
                setTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);


    const handleThemeChange = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        setTheme(newTheme);
    };

    return (
        <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-background-variant-2 dark:bg-darkmode-background-variant-2 shadow-inner">
            <button
                onClick={() => handleThemeChange('light')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === 'light'
                        ? 'bg-neutral-light text-accent shadow-md'
                        : 'text-secondary-variant hover:bg-neutral-light dark:hover:bg-darkmode-secondary dark:text-darkmode-text'
                }`}
                title="Light mode"
            >
                <Sun size={20} />
            </button>

            <button
                onClick={() => handleThemeChange('system')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === 'system'
                        ? 'bg-neutral-light text-accent-variant shadow-md dark:bg-darkmode-secondary-variant'
                        : 'text-secondary-variant hover:bg-neutral-light dark:hover:bg-darkmode-secondary dark:text-darkmode-text'
                }`}
                title="System theme"
            >
                <Monitor size={20} />
            </button>

            <button
                onClick={() => handleThemeChange('dark')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === 'dark'
                        ? 'bg-darkmode-secondary-variant text-darkmode-text shadow-md'
                        : 'text-secondary-variant hover:bg-neutral-light dark:hover:bg-darkmode-secondary dark:text-darkmode-text'
                }`}
                title="Dark mode"
            >
                <Moon size={20} />
            </button>
        </div>

    );
};

export default DarkmodeButton;