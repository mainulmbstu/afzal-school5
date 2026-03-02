import { Axios } from "@/lib/helpers/AxiosInstance";
import SpeechPage from "@/lib/components/SpeechPage";

export const metadata = {
	title: "Assistant Director",
	description: "Assistant Director page",
};
const ADirector = async () => {
	const { data } = await Axios.get("/json/data.json");
	const single = data
		? data?.find((item) => item?.designation === "Assistant Director")
		: null;
	return (
		<div>
			<SpeechPage single={single} />
		</div>
	);
};
export default ADirector;
