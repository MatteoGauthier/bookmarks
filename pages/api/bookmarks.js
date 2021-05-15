import { getBookmarks } from "../../libs/raindrop";

export default async (req, res) => {

	let authHeader = req.headers.authorization;
	let token;
	if (authHeader.startsWith("Bearer ")) {
		token = authHeader.substring(7, authHeader.length);
	} else {
		return res.status(401).json({
      text: 'auth required'
    });
	}

	if (token !== process.env.FUNCTION_AUTH) {
		return res.status(401).json({
      text: 'auth required'
    });
	}

	console.log(token);

	const response = await getBookmarks();

	if (!response) {
		console.error(response);
		return res.status(500).json({ text: "An error occured" });
	}

	// const result = await response.json()

	return res.status(200).json(response);
};
