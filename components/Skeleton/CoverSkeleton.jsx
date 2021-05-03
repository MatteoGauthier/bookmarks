import React from "react";
import ContentLoader from "react-content-loader";
import { useTheme } from "next-themes";

const MyLoader = (props) => {
	const { theme } = useTheme();
	return (
		<ContentLoader
			speed={2}
			width={64}
			height={64}
			viewBox="0 0 64 64"
			backgroundColor={theme == "light" ? "#fafafa" : "#131313"}
			foregroundColor={theme == "light" ? "#eeeeee" : "#2b2b2b"}
			{...props}
		>
			<rect x="0" y="0" rx="4" ry="4" width="64" height="64" />
		</ContentLoader>
	);
};
export default MyLoader;
