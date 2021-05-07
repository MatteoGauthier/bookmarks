import { ThemeProvider } from 'next-themes'

import '../styles/global.css'

import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
