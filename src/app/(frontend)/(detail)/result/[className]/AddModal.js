"use client";
import Form from "next/form";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import blogBanner from "@/assets/blog.svg";
import { useAuth } from "@/lib/components/context";
import SubmitButton from "@/lib/components/SubmitButton";
import { createAction } from "./action";

const AddModal = ({ className }) => {
	const [loading, setLoading] = useState(false);
	const [picture, setPicture] = useState("");
	const router = useRouter();
	const pathname = usePathname();
	const { userInfo } = useAuth();
	let fileType = picture?.type?.split("/")[0];

	const clientAction = async (formData) => {
		setLoading(true);
		const data = await createAction(formData);

		setLoading(false);
		if (data?.success) {
			Swal.fire("Success", data?.message, "success");
			router.refresh(pathname);
			setPicture("");
			// toast.success(data?.message);
		} else {
			Swal.fire("Error", data?.message, "error");
			// toast.error(data?.message);
			// toast.error(data?.message);
		}
	};
	return (
		<div className=" relative">
			{/* The button to open modal */}
			<label
				htmlFor="CreateProductModal"
				className={userInfo?.role !== "admin" ? "hidden" : "btn btn-primary"}
			>
				{loading ? "Submitting" : "Add result"}
			</label>

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="CreateProductModal" className="modal-toggle" />
			<div
				className="modal justify-start items-start md:items-start md:justify-center"
				role="dialog"
			>
				<div className="modal-box  max-h-fit mt-10">
					<h3 className="text-lg font-bold">Add Item</h3>
					<div className=" grid md:grid-cols-1">
						<div className="p-3 mx-auto">
							<Image
								priority={true}
								src={
									fileType === "image"
										? URL.createObjectURL(picture)
										: fileType === "application"
											? "/pdf.png"
											: blogBanner
								}
								alt="File"
								className="h-40 w-auto object-contain"
								height={200}
								width={200}
							/>
						</div>
						<div className="p-3">
							<Form
								action={clientAction}
								className=" p-4  bg-slate-300 shadow-lg shadow-blue-300 card"
							>
								<div className="mt-3">
									<label className="block" htmlFor="title">
										Title
									</label>
									<input
										className="input"
										type="text"
										id="title"
										name="title"
										required
										placeholder="Enter title"
									/>
								</div>
								<div className="mt-3">
									<label className="block" htmlFor="className">
										Type
									</label>
									<input
										className="input"
										type="text"
										id="className"
										name="className"
										required
										readOnly
										placeholder="Enter className"
										defaultValue={className}
									/>
								</div>
								{/* <div>
									<label className="block" htmlFor="title">
										Select Class Name
									</label>
									<select
										// onChange={(e) => roleHandle(e.target.value, id)}
										// defaultValue={'Select Category'}
										name="className"
										className="select w-full text-lg"
										required
									>
										<option value="">Select Class</option>
										{classes?.map((item, i) => (
											<option key={i} value={item}>
												{item}
											</option>
										))}
									</select>
								</div> */}

								<div className="mt-3">
									<label className="block" htmlFor="name">
										Select a file (image or pdf)
									</label>
									<input
										onChange={(e) => {
											setPicture(e.target.files[0]);
										}}
										className="input text-lg"
										type="file"
										id="file"
										name="file"
										required
									/>
								</div>
								<div className="mt-3">
									<SubmitButton title={"Submit"} design={"btn-accent"} />
								</div>
							</Form>
						</div>
					</div>
					<div className="modal-action">
						<label htmlFor="CreateProductModal" className="btn btn-error">
							Close
						</label>
					</div>
					<div className="modal-action">
						<label
							htmlFor="CreateProductModal"
							className="btn btn-ghost absolute right-0 top-0 rounded-full"
						>
							X
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddModal;
