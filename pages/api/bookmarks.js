import { getBookmarks } from "../../libs/notion";

export default async (req, res) => {
	if (!req.headers.authorization) {
		return res.status(401).json({
			text: "auth required",
		});
	}

	let authHeader = req.headers.authorization;
	let token;
	if (authHeader.startsWith("Bearer ")) {
		token = authHeader.substring(7, authHeader.length);
	} else {
		return res.status(401).json({
			text: "auth required",
		});
	}

	if (token !== process.env.FUNCTION_AUTH) {
		return res.status(401).json({
			text: "auth required",
		});
	}

	const response = await getBookmarks();

	if (!response) {
		console.error(response);
		return res.status(500).json({ text: "An error occured" });
	}

	return res.status(200).json(response);
};
