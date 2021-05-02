import fetch from "isomorphic-unfetch";
import { binRead, binSave } from "./jsonbin";
const { RAINDROP_TOKEN: token } = process.env;
const BOOKMARKS_TAG = "website-bookmarks";
const BOOKMARKS_ENDPOINT = `https://api.raindrop.io/rest/v1/raindrops/0?search=[{"key":"tag","val":"${BOOKMARKS_TAG}"}]`;

export const getBookmarks = async () => {
	const response = await fetch(BOOKMARKS_ENDPOINT, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.status !== 200) {
		console.error(`Rain drop return ${response.statusText} starting fallback process`);
		const fallbackData = await binRead({ binId: "60086cbaa3d8a0580c340c0c" });
		console.log("Fallback data was fetched");
		return fallbackData.data;
	}

	const data = await response.json();

	binSave({ binId: "60086cbaa3d8a0580c340c0c", newId: Date.now(), data })
		.then(() => console.log("JSON data saved"))
		.catch((error) => console.error(error));
	return data;
};
