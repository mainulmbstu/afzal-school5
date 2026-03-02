import moment from "moment";
import Link from "next/link";
import DeleteModal from "@/lib/components/DeleteModal";
import { getCookieValue } from "@/lib/helpers/getCookieValue";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { deleteAction, getAllAction } from "./action";
import AddModal from "./AddModal";

export const metadata = {
	title: "Class routine",
	description: "Class routine page",
};
const Users = async () => {
	const userInfo = await getTokenData(await getCookieValue("token"));
	const data = await getAllAction();
	const entries = data?.success && JSON.parse(data?.list);

	return (
		<div>
			<div className=" card p-2 mt-5">
				<AddModal />
				<h3>Total: ({entries?.length})</h3>
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
		</div>
	);
};

export default Users;

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
