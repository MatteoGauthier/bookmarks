import { getBookmarks } from "../../libs/notion"
import getLinksScore from "../../libs/links-stats"
import { produce } from "immer"
export default async (req, res) => {
	if (!req.headers.authorization) {
		return res.status(401).json({
			text: "auth required",
		})
	}

	let authHeader = req.headers.authorization
	let token
	if (authHeader.startsWith("Bearer ")) {
		token = authHeader.substring(7, authHeader.length)
	} else {
		return res.status(401).json({
			text: "auth required",
		})
	}

	if (token !== process.env.FUNCTION_AUTH) {
		return res.status(401).json({
			text: "auth required",
		})
	}

	const response = await getBookmarks()


	if (!response) {
		console.error(response)
		return res.status(500).json({ text: "An error occured" })
	}

	// group items of an array of object if a property exist
	const grouped = produce(response.items, (draft) => {
		const scored = draft
			.filter((item) => item.score)
			.sort((a, b) => {
				if (a.score == b.score) {
					return new Date(b.lastUpdate) - new Date(a.lastUpdate)
				}
				return b.score - a.score
			})
		const notScored = draft
			.filter((item) => !item.score)
			.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))
		return [scored, notScored]
	})

	return res.status(200).json(grouped)
}
