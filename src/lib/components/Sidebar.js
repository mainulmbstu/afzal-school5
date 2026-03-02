import Link from "next/link";
import { Axios } from "@/lib/helpers/AxiosInstance";
import Image from "next/image";

const Sidebar = async () => {
	const { data } = await Axios.get("/json/data.json");
	return (
		<div>
			{data
				? data.map((item, index) => (
						<div
							key={index}
							className="mb-4 bg-base-300 p-2 min-h-72 dark:text-white"
						>
							<h4 className="mb-3 py-3 uppercase bg-blue-400">
								{item.designation}'s Message
							</h4>
							<div className=" grid lg:grid-cols-3 gap-2">
								<Image
									className="w-40 object-cover me-2 col-span-1 "
									width={1500}
									height={1000}
									priority={true}
									src={item?.image || "/dummy.jpeg"}
									alt={item?.name}
								/>
								<div className=" col-span-2">
									<p> {`${item?.speech.substring(0, 150)}.....`} </p>
								</div>
							</div>
							<div className="text-right py-3">
								<Link
									href={`/admin/${item.link}`}
									className="text-blue-600 hover:underline py-3"
								>
									Read More
								</Link>
							</div>
						</div>
					))
				: ""}
		</div>
	);
};

export default Sidebar;
