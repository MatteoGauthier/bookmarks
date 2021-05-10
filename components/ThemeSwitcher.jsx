import { useTheme } from "next-themes";
import SunIcon from "@heroicons/react/outline/SunIcon";
import MoonIcon from "@heroicons/react/outline/MoonIcon";
import { useState, useEffect } from "react";

const ThemeChanger = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<div className="absolute top-0 right-0 m-4 md:m-12 md:left-0">
			<button
				className={`p-2 border rounded-md ${theme == "light" ? "border-gray-800" : "border-gray-400"}`}
				type="button"
				onClick={() => setTheme(theme == "dark" ? 'light' : 'dark' )}
				aria-label="theme switch"
			>
				{theme == "light" ? (
					<MoonIcon className="w-6 h-6 text-gray-300" />
				) : (
					<SunIcon className="w-6 h-6 text-gray-800" />
				)}
			</button>
		</div>
	);
};

export default ThemeChanger;
