import Marquee from "react-fast-marquee";
import { getNews } from "./action";

const News = async () => {
	const data = await getNews();
	const single = data?.success && JSON.parse(data?.single);
	return (
		<div>
			<div className="flex bg-green-300">
				<h3 className="mt-2 me-3">News:</h3>
				<Marquee
					behavior="scroll"
					direction="left"
					loop={""}
					speed={100}
					className="text-xl font-semibold mt-2"
				>
					<h3>{single ? single?.news : "No news available ||"}</h3>
				</Marquee>
			</div>
		</div>
	);
};

export default News;
