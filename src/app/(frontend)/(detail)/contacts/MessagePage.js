import moment from "moment";
import Pagination from "@/lib/components/pagination";
import { getCookieValue } from "@/lib/helpers/getCookieValue";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { wait } from "@/lib/helpers/helperFunction";
import { getMessageAction } from "./action";

const MessagePage = async ({ searchParams }) => {
	const spms = await searchParams;
	const page = Number((await spms["page"]) ?? "1");
	const perPage = Number((await spms["perPage"]) ?? "12");
	const userInfo = await getTokenData(await getCookieValue("token"));

	const data = await getMessageAction(page, perPage, userInfo);
	const contacts = data?.success && JSON.parse(data?.list);
	return (
		<div className="my-3 px-2">
			<h3 className=" box-decoration-slice bg-linear-to-r from-blue-400 via-yellow-300 to-pink-400 mb-2">
				Your Previous Message
			</h3>
			<div>
				{contacts?.length &&
					contacts.map((item, i) => {
						return (
							<div
								key={item._id}
								className={` border p-2 px-3 ${
									i % 2 ? " bg-zinc-200" : "bg-white"
								}`}
							>
								<p>
									<b className=" bg-blue-300">You:</b> (
									{moment(item?.createdAt).fromNow()},
									{moment(item?.createdAt).format("DD-MM-YY hh:mm a")})
								</p>
								<p>Message: {item.message} </p>
								<p>
									Time: ({moment(item?.createdAt).fromNow()},
									{moment(item?.createdAt).format("DD-MM-YY hh:mm a")})
								</p>

								<hr className=" w-25" />
								{item?.replies &&
									item?.replies?.reverse().map((rep, i, arr) => {
										return (
											<div key={i}>
												<p className=" font-bold ">
													<span className="bg-green-300">
														Reply-{arr?.length - i}:
													</span>{" "}
													{rep.msg}
												</p>
												<p className="">Replied by: {rep.userName}</p>
												<p>
													Time: {moment(rep?.date).fromNow()},
													{moment(rep?.date).format("DD-MM-YY hh:mm a")}
												</p>
											</div>
										);
									})}
							</div>
						);
					})}
			</div>
			<div className=" mt-3 ">
				<Pagination
					total={data?.total || []}
					page={page}
					perPage={perPage}
					spms1="keyword"
					spms1Value={""}
					spms2=""
					spms2Value={""}
				/>
			</div>
		</div>
	);
};

export default MessagePage;
