import Carousel2 from "@/lib/components/carousel2";
import AddImageModal from "./AddModal";

import { getAllAction } from "./action";

import ListPage from "./ListPage";
import getBase64 from "@/lib/helpers/plaiceholder";

export const metadata = {
	title: "Gallery",
	description: "Gallery page",
};

const Gallery = async ({ searchParams }) => {
	let spms = await searchParams;
	let page = Number((await spms.page) ?? 1);
	let perPage = Number((await spms.perPage) ?? 12);
	// let perPage = Number((await spms["perPage"]) ?? 12);
	let blurData = await getBase64("");

	const data = await getAllAction(page, perPage);
	const entries = data?.success && JSON.parse(data?.list);
	let linkArr = [];
	if (entries?.length) {
		for (let item of entries) {
			linkArr.push(item?.picture?.secure_url);
		}
	}
	let slides = linkArr;

	return (
		<div>
			<div>
				<AddImageModal />
			</div>
			<div>
				<Carousel2 slides={slides} autoPlay={true} interval={2000} />
			</div>
			<div>
				<ListPage value={{ entries, data, page, perPage, blurData }} />
			</div>
		</div>
	);
};

export default Gallery;
