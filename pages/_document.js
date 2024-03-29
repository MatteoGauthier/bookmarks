import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#000" />
          <meta name="theme-color" content="#000" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="canonical" href="https://bookmarks.squale.agency" />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:url" content="https://bookmarks.squale.agency/" />
          <meta
            property="twitter:title"
            content="Bookmarks | Ressources et outils du web (design, fonts, icons, et +)"
          />
          <meta property="twitter:site" content="@MatteoGauthier_" />
          <meta property="twitter:creator" content="@MatteoGauthier_" />
          <meta
            property="twitter:description"
            content="Liste d'outils, de ressources et de services utilisés par squale.agency. Utile pour les créatifs, les développeurs ou encore le marketing. Mis à jour régulièrement !"
          />
          <meta property="twitter:image" content="https://bookmarks.squale.agency/apple-touch-icon.png" />
          <meta
            name="keywords"
            content="bookmarks, liste, squale, Mattèo Gauthier, Candice Fradet, Mattèo, ressources, design"
          />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-6RSQQD3GZ5"></script>
					<script
						dangerouslySetInnerHTML={{
							__html: ` window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-6RSQQD3GZ5');`,
						}}
					/> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','GTM-N78JKD7');`,
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
                        
							{
							  "@context": "https://schema.org/",
							  "@type": "WebSite",
							  "name": "Bookmarks",
							  "url": "https://bookmarks.squale.agency",
							  "potentialAction": {
								"@type": "SearchAction",
								"target": "https://bookmarks.squale.agency/?q={search_term_string}",
								"query-input": "required name=search_term_string"
							  }
							}
    `,
            }}
          ></script>
          <link
            rel="search"
            href="/opensearch.xml"
            type="application/opensearchdescription+xml"
            title="Bookmarks search"
          />
        </Head>
        <body className="transition-colors duration-200 bg-white dark:bg-black">
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N78JKD7"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
          <noscript>
            <img src="https://shynet-railway-production.up.railway.app/ingress/27311224-d936-4066-92a7-7041e3fcc239/pixel.gif" />
          </noscript>
          <script
            defer
            src="https://shynet-railway-production.up.railway.app/ingress/27311224-d936-4066-92a7-7041e3fcc239/script.js"
          ></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
