import { useTheme } from "next-themes";
import SunIcon from "@heroicons/react/outline/SunIcon";
import MoonIcon from "@heroicons/react/outline/MoonIcon";

const ThemeChanger = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="absolute top-0 right-0 m-4 md:m-12 md:left-0">
			{theme == "light" ? (
				<button  className="p-2 border border-gray-800 rounded-md" onClick={() => setTheme("dark")}>
					<MoonIcon className="w-6 h-6 text-gray-300"/>
				</button>
			) : (
				<button className="p-2 border border-gray-400 rounded-md" onClick={() => setTheme("light")}>
					<SunIcon className="w-6 h-6 text-gray-800"/>
				</button>
			)}
		</div>
	);
};

export default ThemeChanger
