"use client";
import { useAuth } from "@/lib/components/context";
import DeleteModal from "@/lib/components/DeleteModal";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { deleteAction } from "./action";
import Pagination from "@/lib/components/pagination";

const ListPage = ({ value }) => {
	let { entries, data, page, perPage, blurData } = value;
	let [images, setImages] = useState([]);
	let [selectedImages, setSelectedImages] = useState([]);
	let { userInfo } = useAuth();

	useEffect(() => {
		setImages(entries);
	}, [entries]);
	let selectHandle = (e) => {
		let { name, checked } = e.target;

		let tempArr = images?.map((item) =>
			item?._id === name ? { ...item, isChecked: checked } : item,
		);
		setImages(tempArr);
		let selectIdArr =
			tempArr?.length &&
			tempArr?.filter((item) => item?.isChecked).map((item) => item?._id);
		setSelectedImages(selectIdArr);
	};

	return (
		<div>
			<h5 className=""> Total Images: {data?.total} </h5>
			<div className=" bg-blue-400 inline-block mb-3">
				<DeleteModal
					value={{
						name: "Delete selected images",
						id: selectedImages,
						message: `Do you want to delete ${selectedImages?.length} ${selectedImages?.length > 1 ? "items" : "item"} `,
						action: deleteAction,
					}}
				/>
			</div>
			<div className=" grid md:grid-cols-4 lg:grid-cols-6 gap-4 ">
				{images?.length ? (
					images?.map((item) => (
						<div
							key={item?._id}
							className="border h-full flex items-center relative"
						>
							<div>
								<Link
									href={item?.picture?.secure_url || "/dummy.jpeg"}
									target="_blank"
								>
									<Image
										className=" max-h-40 object-contain"
										blurDataURL={blurData}
										placeholder="blur"
										width={1500}
										height={1000}
										priority={true}
										src={item?.picture?.secure_url || "/dummy.jpeg"}
										alt={"image"}
									/>
								</Link>
							</div>
							<div
								className={
									userInfo?.role !== "admin"
										? " hidden"
										: " absolute top-0 right-0"
								}
							>
								<input
									onChange={selectHandle}
									className=" size-5"
									type="checkbox"
									name={item?._id}
									id={item?._id}
									checked={item?.isChecked || false}
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

export default ListPage;
