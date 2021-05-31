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
						property: "Name",
						text: {
							is_not_empty: true,
						},
					},
					{
						property: "Excerpt",
						text: {
							is_not_empty: true,
						},
					},
					{
						property: "Link",
						text: {
							is_not_empty: true,
						},
					},
					{
						property: "LastUpdate",
						date: {
							is_not_empty: true,
						},
					},
					{
						property: "CreatedAt",
						date: {
							is_not_empty: true,
						},
					},
					{
						property: "Cover",
						files: {
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

	const filteredResult = responseResult.results.filter((elm) => {
		console.log(elm.properties.Cover)
		let expr =
			elm.properties.Cover.files.length !== 0 &&
			elm.properties.Excerpt.rich_text[0].plain_text !== "" &&
			elm.properties.LastUpdate.date.start &&
			elm.properties.Tags.multi_select.length !== 0 &&
			elm.properties.Link.url.length !== 0 &&
			elm.properties.Name.title.length !== 0 &&
			elm.properties.CreatedAt.date.start.length !== 0;
		return expr;
	});


	const data = {
		items: filteredResult.map((element) => {
			let l = {
				name: element.properties.Name.title[0].plain_text,
				link: element.properties.Link.url,
				excerpt: element.properties.Excerpt.rich_text[0].plain_text,
				lastUpdate: element.properties.LastUpdate.date.start,
				createdAt: element.properties.CreatedAt.date.start,
				tags: element.properties.Tags.multi_select.map((tag) => {
					return tag.name;
				}),
				cover: element.properties.Cover?.files[0]?.name,
			};
			return l
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
