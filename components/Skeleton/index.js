import CoverSkeleton from "./CoverSkeleton";
import ContentSkeleton from "./ContentSkeleton";
import { useState, useEffect } from "react";

function Skeleton(props) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;
	return (
		<div
			{...props}
			className="flex items-start justify-start w-full px-2 py-2 text-gray-900 transition-all duration-100 bg-blue-800 rounded-md cursor-pointer dark:text-white transform-gpu ring-1 dark:ring-opacity-10 ring-opacity-10 dark:ring-blue-100 ring-blue-700 bg-opacity-5"
		>
			<CoverSkeleton />
			<div className="flex flex-col flex-1 mt-1 ml-3 space-y-1">
				<ContentSkeleton />
			</div>
			<div className="flex items-center justify-center w-10 h-10 ml-2 bg-blue-200 rounded-md md:w-12 md:h-12 text-opacity-80 text-blue-50 bg-opacity-5"></div>
		</div>
	);
}

export default Skeleton;
