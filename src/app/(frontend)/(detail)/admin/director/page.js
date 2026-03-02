import { Axios } from "@/lib/helpers/AxiosInstance";
import SpeechPage from "@/lib/components/SpeechPage";

export const metadata = {
	title: "Director",
	description: "Director page",
};
const Director = async () => {
	const { data } = await Axios.get("/json/data.json");
	const single = data
		? data?.find((item) => item?.designation === "Director")
		: null;
	return (
		<div>
			<SpeechPage single={single} />
		</div>
	);
};

export default Director;
