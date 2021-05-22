import fetch from "isomorphic-unfetch";
import { binRead, binSave } from "./jsonbin";
const { NOTION_TOKEN: token, NOTIONDB } = process.env;
const BOOKMARKS_ENDPOINT = `https://api.notion.com/v1/databases/${NOTIONDB}/query`;

export const getBookmarks = async () => {
	const response = await fetch(BOOKMARKS_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			filter: {
				or: [
					{
						property: "Excerpt",
						text: {
							is_not_empty: true,
						},
					},
				],
			},
			sorts: [
				{
					property: "LastUpdate",
					direction: "ascending",
				},
			],
		}),
	}).catch((error) => console.error(error));

	if (!response || response.status !== 200) {
		console.error(`Notion.so return ${response ? response.statusText : "request error"} starting fallback process`);
		const fallbackData = await binRead({ binId: "60086cbaa3d8a0580c340c0c" });
		console.log("Fallback data was fetched");
		await fallbackData.data.items.sort(function (a, b) {
			return new Date(b.lastUpdate) - new Date(a.lastUpdate);
		});
		return fallbackData.data;
	}

	const responseResult = await response.json();

	const data = {
		items: responseResult.results.map((element) => {
			return {
				name: element.properties.Name.title[0]?.plain_text || "empty",
				link: element.properties.Link?.url || "empty",
				exercept: element.properties.Excerpt.text[0]?.plain_text || "empty",
				lastUpdate: element.properties.LastUpdate?.date.start || "empty",
				createdAt: element.properties.CreatedAt?.date.start || "empty",
				tags: (element.properties.Tags?.multi_select || ["empty"]).map((tag) => {
					return tag.name;
				}),
				cover: element.properties.Cover.files[0]?.name || "empty",
			};
		}),
	};

	await data.items.sort(function (a, b) {
		return new Date(b.lastUpdate) - new Date(a.lastUpdate);
	});

	await binSave({ binId: "60086cbaa3d8a0580c340c0c", newId: Date.now(), data })
		.then(() => console.log("JSON data saved"))
		.catch((error) => console.error(error));

	return data;
};
