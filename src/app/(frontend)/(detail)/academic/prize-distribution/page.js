import AddImageModal from "./AddModal";

import { deleteAction, getAllAction } from "./action";

import getBase64 from "@/lib/helpers/plaiceholder";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/lib/components/pagination";
import DeleteModal from "@/lib/components/DeleteModal";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { getCookieValue } from "@/lib/helpers/getCookieValue";

export const metadata = {
	title: "Prize distribution",
	description: "Prize distribution page",
};

const Prize = async ({ searchParams }) => {
	let spms = await searchParams;
	let page = Number((await spms.page) ?? 1);
	let perPage = Number((await spms.perPage) ?? 12);
	const userInfo = await getTokenData(await getCookieValue("token"));
	let blurData = await getBase64("");

	const data = await getAllAction(page, perPage);
	const entries = data?.success && JSON.parse(data?.list);

	return (
		<div>
			<div>
				<AddImageModal />
			</div>

			<div className=" gap-4 ">
				{entries?.length ? (
					entries?.map((item) => (
						<div
							key={item?._id}
							className=" h-full flex justify-center items-center relative mb-5"
						>
							<div>
								<Link
									href={item?.picture?.secure_url || "/dummy.jpeg"}
									target="_blank"
								>
									<figure>
										<Image
											className=" max-h-screen object-contain"
											blurDataURL={blurData}
											placeholder="blur"
											width={1500}
											height={1000}
											priority={true}
											src={item?.picture?.secure_url || "/dummy.jpeg"}
											alt={"image"}
										/>
										<figcaption> {item?.caption} </figcaption>
									</figure>
								</Link>
							</div>
							<div className={" absolute top-0 right-0 bg-blue-200"}>
								<DeleteModal
									value={{
										id: item?._id,
										message: `Do you want to delete ${item?.caption}`,
										action: deleteAction,
									}}
								/>
							</div>
						</div>
					))
				) : (
					<div>No data found</div>
				)}
			</div>
			<div className=" mt-3 ">
				<Pagination
					total={data?.total || 1}
					page={page}
					perPage={perPage}
					spms1="keyword"
					spms1Value=""
				/>{" "}
			</div>
		</div>
	);
};

export default Prize;
