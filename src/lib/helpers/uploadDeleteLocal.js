import fs from "fs/promises";
import path from "path";

export const uploadLocal = async (file) => {
	try {
		const bufferData = await file.arrayBuffer();
		const buffer = Buffer.from(bufferData);
		// let buffer = new Uint8Array(bufferData);
		const fileName = Date.now() + path.extname(file.name);
		const filePath = `./public/uploads/${fileName}`;
		await fs.writeFile(filePath, buffer);
		// return filePath;
		return filePath.replace("./public", "");
	} catch (error) {
		console.log(error);
		return;
	}
};
//========================================================
export const deleteLocal = async (frontFilePath) => {
	const filePath = "./public" + frontFilePath;
	console.log(filePath);
	try {
		await fs.access(filePath);
		await fs.unlink(filePath);
	} catch (error) {
		if (error.code === "ENOENT") {
			console.log("File does not exist");
		} else {
			console.error("Error deleting file:", error);
		}
	}
};
