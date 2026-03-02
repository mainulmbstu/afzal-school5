"use client";
import Form from "next/form";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import blogBanner from "@/assets/blog.svg";
import { useAuth } from "@/lib/components/context";
import SubmitButton from "@/lib/components/SubmitButton";
import { createAction } from "./action";

const AddNewsModal = () => {
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
		}
	};
	return (
		<div className="my-2">
			{/* The button to open modal */}
			<label
				htmlFor="CreateProductModal"
				className={userInfo?.role !== "admin" ? "hidden" : "btn btn-primary"}
			>
				{loading ? "Submitting" : "Change scrolling news"}
			</label>

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="CreateProductModal" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box">
					<h3 className="text-lg font-bold">Create Product</h3>
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
									<label className="block" htmlFor="news">
										Write news
									</label>
									<textarea
										rows="5"
										className=""
										type="text"
										id="news"
										name="news"
										required
										placeholder="Enter news"
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
				</div>
			</div>
		</div>
	);
};

export default AddNewsModal;
