import fs from "fs/promises";

export const writeData = async (file, data) => {
	try {
		await fs.writeFile(file, JSON.stringify(data, null, 2));
	} catch (err) {
		console.error("Error writing file:", err);
	}
};
