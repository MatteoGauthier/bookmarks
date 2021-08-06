import { google } from "googleapis"

/**
 *
 * @namespace getLinksScore
 **/

export default async function handler(req, res) {
	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: process.env.GOOGLE_CLIENT_EMAIL,
			client_id: process.env.GOOGLE_CLIENT_ID,
			private_key: process.env.GOOGLE_PRIVATE_KEY,
		},
		scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
	})
	// const jwt = google.auth.JWT(key.client_email, null, key.private_key, scopes)

	const analytics = google.analytics({
		auth,
		version: "v3",
	})

	const response = await analytics.data.ga.get({
		ids: "ga:242418802",
		dimensions: "ga:eventCategory,ga:eventAction,ga:eventLabel",
		metrics: "ga:totalEvents",
		"start-date": "30daysAgo",
		"end-date": "today",
		segment: "gaid::-1",
		filters: "ga:eventCategory==aev_outbound_links",
	})

	// let data = {
	// 	pageViews: response.data.rows[0][0],
	// }

	// console.table(response.data.rows)

	console.info("Google Analytics data fetched")
	return response.data.rows
}

// https://www.googleapis.com/analytics/v3/data/ga?ids=ga:242418802&dimensions=ga:eventCategory,ga:eventAction,ga:eventLabel&metrics=ga:totalEvents&sort=ga:totalEvents&segment=gaid::-1&start-date=7daysAgo&end-date=today
handler()

// npx cross-env NODE_ENV=${NODE_ENV:-development} dotenv-flow -- npx babel-node pages/api/links-stats.js  --presets @babel/preset-env
