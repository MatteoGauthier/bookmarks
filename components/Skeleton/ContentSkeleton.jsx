import React from "react";
import { useTheme } from "next-themes";

import ContentLoader from "react-content-loader";

const MyLoader = (props) => {
	const { theme } = useTheme();
	return (
		<ContentLoader
			speed={2}
			width={230}
			height={50}
			viewBox="0 0 230 50"
			backgroundColor={theme == "light" ? "#fafafa" : "#131313"}
			foregroundColor={theme == "light" ? "#eeeeee" : "#2b2b2b"}
			{...props}
		>
			<rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
			<rect x="0" y="25" rx="4" ry="4" width="230" height="20" />
		</ContentLoader>
	);
};

export default MyLoader;
