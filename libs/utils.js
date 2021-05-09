import fetch from "isomorphic-unfetch";

export const IsImageAvaible = async (url) =>
	new Promise(async (resolve, reject) => {
		try {
			const image = await fetch(url);
            console.log(imaeg.status);
			if (image.status !== 200) {
				resolve(false);
			}
		} catch (e) {
			resolve(false);
		}
		resolve(true);
	});
