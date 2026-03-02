import fs from "fs/promises";

export const getData = async (file) => {
	try {
		// Read file synchronously
		if (!file) return [];
		const data = await fs.readFile(file, "utf8");
		// let one = JSON.parse(data).find((item) => item.name === person);

		return data ? JSON.parse(data) : [];
	} catch (err) {
		console.error("Error reading file:", err);
	}
};
