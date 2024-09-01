import { useEffect, useState } from "react";

import { Button } from "../shared/Button";

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setMounted(true);
        const theme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(theme === 'dark' || (!theme && systemPrefersDark));
    }, []);

    useEffect(() => {
        if (mounted) {
            const root = window.document.documentElement;
            if (darkMode) {
                root.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                root.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }, [darkMode, mounted]);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    if (!mounted) return null;

    return (
        <Button
            className="bg-[#624de3] text-white px-4 py-2 rounded"
            onClick={toggleTheme}
        >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
    );
};