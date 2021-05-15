import { Provider } from "next-auth/client";
import { ThemeProvider } from "next-themes";

import "../styles/global.css";

import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<ThemeProvider attribute="class" defaultTheme="system">
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
