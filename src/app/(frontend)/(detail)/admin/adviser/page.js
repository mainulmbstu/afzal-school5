import { Axios } from "@/lib/helpers/AxiosInstance";
import SpeechPage from "@/lib/components/SpeechPage";

export const metadata = {
	title: "Adviser",
	description: "Adviser page",
};

const Adviser = async () => {
	const { data } = await Axios.get("/json/data.json");
	const single = data
		? data?.find((item) => item?.designation === "Adviser")
		: null;
	return (
		<div>
			<SpeechPage single={single} />
		</div>
	);
};

export default Adviser;
