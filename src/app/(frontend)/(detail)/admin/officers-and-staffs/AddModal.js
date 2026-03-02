"use client";
import Form from "next/form";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import blogBanner from "@/assets/blog.svg";
import { useAuth } from "@/lib/components/context";
import SubmitButton from "@/lib/components/SubmitButton";
import { createAction } from "./action";

const AddOfficerStaffModal = () => {
	const [loading, setLoading] = useState(false);
	const [picture, setPicture] = useState("");
	const router = useRouter();
	const pathname = usePathname();
	const { userInfo } = useAuth();

	const clientAction = async (formData) => {
		setLoading(true);
		const data = await createAction(formData);

		setLoading(false);
		if (data?.success) {
			Swal.fire("Success", data?.message, "success");
			router.refresh(pathname);
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
				{loading ? "Submitting" : "Add Officer or Staff"}
			</label>

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="CreateProductModal" className="modal-toggle" />
			<div
				className="modal justify-start items-start md:items-center md:justify-center"
				role="dialog"
			>
				<div className="modal-box  max-h-fit mt-10">
					<h3 className="text-lg font-bold">Add Item</h3>
					<div className=" grid md:grid-cols-1">
						<div className="p-3 mx-auto">
							<Image
								priority={true}
								src={picture ? URL.createObjectURL(picture) : blogBanner}
								alt="image"
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
									<label className="block" htmlFor="uniqueid">
										Unique ID
									</label>
									<input
										className="input"
										type="text"
										id="uniqueid"
										name="uniqueid"
										required
										placeholder="Enter unique id"
									/>
								</div>
								<div className="mt-3">
									<label className="block" htmlFor="name">
										Name
									</label>
									<input
										className="input"
										type="text"
										id="name"
										name="name"
										required
										placeholder="Enter Name"
									/>
								</div>
								<div className="mt-3">
									<label className="block" htmlFor="email">
										Email
									</label>
									<input
										className="input"
										type="email"
										id="email"
										name="email"
										required
									/>
								</div>
								<div className="mt-3">
									<label className="block" htmlFor="designation">
										Designation
									</label>
									<input
										className="input"
										type="text"
										id="designation"
										name="designation"
										required
										placeholder="Enter designation"
									/>
								</div>
								<div className="mt-3">
									<label className="block" htmlFor="department">
										Department
									</label>
									<input
										className="input"
										type="text"
										id="department"
										name="department"
										required
										placeholder="Enter department"
									/>
								</div>

								<div className="mt-3">
									<label className="block" htmlFor="joiningdate">
										Joining date
									</label>
									<input
										className="input"
										type="date"
										id="joiningdate"
										name="joiningdate"
										required
										placeholder="Enter joining date"
									/>
								</div>

								<div className="mt-3">
									<label className="block" htmlFor="name">
										Select a photo (optional)
									</label>
									<input
										onChange={(e) => {
											setPicture(e.target.files[0]);
										}}
										className="input"
										type="file"
										id="file"
										name="file"
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

export default AddOfficerStaffModal;
