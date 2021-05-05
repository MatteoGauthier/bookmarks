import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="fr">
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />

					<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
<script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-6RSQQD3GZ5"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: ` window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-6RSQQD3GZ5');`
                        }}
                    />
				</Head>
				<body className="transition-colors duration-200 bg-white dark:bg-black">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
