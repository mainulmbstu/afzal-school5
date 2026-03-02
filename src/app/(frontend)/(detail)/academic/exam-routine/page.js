import moment from "moment";
import Link from "next/link";
import DeleteModal from "@/lib/components/DeleteModal";
import { getCookieValue } from "@/lib/helpers/getCookieValue";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { deleteAction, getAllAction } from "./action";
import Pagination from "@/lib/components/pagination";
import AddNoticeModal from "./AddModal";

export const metadata = {
	title: "Exam routine",
	description: "Exam routine page",
};
const Notice = async ({ searchParams }) => {
	let spms = await searchParams;
	let page = Number((await spms.page) ?? 1);
	let perPage = Number((await spms.perPage) ?? 12);
	const userInfo = await getTokenData(await getCookieValue("token"));
	const data = await getAllAction(page, perPage);
	const entries = data?.success && JSON.parse(data?.list);

	return (
		<div>
			<div className=" card p-2 mt-5">
				<AddNoticeModal />
				<h3>Total: ( {data?.total})</h3>
				{/* <h4>Total Sale: {<PriceFormat price={totalPrice} />}</h4> */}
			</div>
			<div className="">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th scope="col">SL</th>
							<th scope="col">Date of Publish</th>
							<th scope="col">Class Name</th>
							<th scope="col">Title</th>
							<th scope="col">Details</th>

							<th
								scope="col"
								className={userInfo?.role !== "admin" ? "hidden" : ""}
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{entries ? (
							entries?.map((item, index) => (
								<tr key={index} className="hover:bg-zinc-200">
									<td>{index + 1}</td>
									<td>
										{moment(item?.createdAt).format("DD-MMM-YYYY hh:mm a")}
									</td>
									<td>{item.className}</td>
									<td>{item.title}</td>
									<td>
										<Link
											className=" underline text-blue-400"
											href={item?.file?.secure_url}
											target="_blank"
										>
											Click for details
										</Link>
									</td>

									<td>
										<DeleteModal
											value={{
												id: item?._id,
												message: `Do you want to delete ${item?.title}`,
												action: deleteAction,
											}}
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td>No data found</td>
							</tr>
						)}
					</tbody>
				</table>
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

export default Notice;

//  <div>
//    <form>
//      <input name="keyword" type="text" id="" />
//      <button
//        // onClick={serverAction}
//        type="submit"
//      >
//        Submit
//      </button>
//    </form>
//    {/* <Input page={page} perPage={perPage} /> */}
//    <div className="grid grid-cols-3 gap-5">
//      {entries?.map(async (item) => {
//        return <Card item={item} />;
//      })}
//    </div>
//    <div className=" mt-3 ">
//      <Pagination
//        totalPage={totalPage}
//        page={page}
//        perPage={perPage}
//        keyword={keyword}
//      />
//    </div>
//  </div>;
