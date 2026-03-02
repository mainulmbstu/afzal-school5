import { getPlaiceholder } from "plaiceholder";

const getBase64 = async (url) => {
	try {
		const res = await fetch(
			url ||
				"https://res.cloudinary.com/dgj1icpu7/image/upload/v1739850899/dir0m1r7wi2bphos1uqk.jpg",
		);
		if (!res.ok) {
			return;
			// throw new Error("Network response is not ok");
		}
		const buffer = await res.arrayBuffer();
		const { base64 } = await getPlaiceholder(Buffer.from(buffer));
		return base64;
	} catch (error) {
		console.log(error);
	}
};

export default getBase64;
