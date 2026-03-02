export const checkPdf = async (url) => {
	if (!url) return;
	try {
		const response = await fetch(url, { method: "HEAD" }); // Use HEAD request to save bandwidth
		const contentType = response.headers.get("content-type");
		if (contentType?.includes("application/pdf")) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error fetching URL headers:", error);
		return false;
	}
};
