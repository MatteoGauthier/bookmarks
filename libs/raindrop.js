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
	}).catch((error) => console.error(error));

	if (!response || response.status !== 200) {
		console.error(`Rain drop return ${response ? response.statusText: 'request error'} starting fallback process`);
		const fallbackData = await binRead({ binId: "60086cbaa3d8a0580c340c0c" });
		console.log("Fallback data was fetched");
		await fallbackData.data.items.sort(function (a, b) {
			return new Date(b.lastUpdate) - new Date(a.lastUpdate);
		});
		return fallbackData.data;
	}

	const data = await response.json();
	await data.items.sort(function (a, b) {
		return new Date(b.lastUpdate) - new Date(a.lastUpdate);
	});

	await binSave({ binId: "60086cbaa3d8a0580c340c0c", newId: Date.now(), data })
		.then(() => console.log("JSON data saved"))
		.catch((error) => console.error(error));

	return data;
};
