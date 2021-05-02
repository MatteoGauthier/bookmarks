import { getBookmarks } from "../../libs/raindrop";

export default async (req, res) => {
  const response = await getBookmarks();

  if (response?.status !== 200) {
    console.error(response.status)
    return res.status(500).json({ text: "An error occured" });
  }

  return res.status(200).json(await response.json());
};
