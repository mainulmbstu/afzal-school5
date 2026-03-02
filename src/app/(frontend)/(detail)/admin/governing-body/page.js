import Image from "next/image";
import Link from "next/link";
import DeleteModal from "@/lib/components/DeleteModal";
import { getCookieValue } from "@/lib/helpers/getCookieValue";
import { getTokenData } from "@/lib/helpers/getTokenData";
import AddMemberModal from "./AddMemberModal";
import { deleteAction, getAllAction } from "./action";

export const metadata = {
	title: "Governing body",
	description: "Governing bod page",
};
const Users = async () => {
	const userInfo = await getTokenData(await getCookieValue("token"));
	const data = await getAllAction();
	const entries = data?.success && JSON.parse(data?.list);
	return (
		<div>
			<h2 className=" uppercase">governing body</h2>
			<hr />
			<div className=" card p-2 mt-5">
				<AddMemberModal />
				<h3>Member of governing body: ( {entries?.length})</h3>
				{/* <h4>Total Sale: {<PriceFormat price={totalPrice} />}</h4> */}
			</div>
			<div className="">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>SL No.</th>
							<th>Image</th>
							<th>Designation</th>
							<th>Name</th>
							<th>Address</th>
							<th className={userInfo?.role !== "admin" ? "hidden" : ""}>
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
										<Link
											href={
												item.picture ? item.picture?.secure_url : "/dummy.jpeg"
											}
											target="_blank"
										>
											<Image
												priority={true}
												className="w-8 h-auto"
												width={30}
												height="0"
												src={
													item.picture
														? item.picture?.secure_url
														: "/dummy.jpeg"
												}
												alt="picture"
											/>
										</Link>
									</td>
									<td>{item.designation}</td>
									<td>{item.name}</td>
									<td>{item.address}</td>
									<td>
										<DeleteModal
											value={{
												id: item?._id,
												message: `Do you want to delete ${item?.name}`,
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
