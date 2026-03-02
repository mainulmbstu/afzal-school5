"use client";
import Form from "next/form";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import blogBanner from "@/assets/blog.svg";
import { useAuth } from "@/lib/components/context";
import SubmitButton from "@/lib/components/SubmitButton";
import ProgressBar from "@/lib/components/ProgressBar";
import { Axios } from "@/lib/helpers/AxiosInstance";

const AddImageModal = () => {
	const [loading, setLoading] = useState(false);
	const [picture, setPicture] = useState("");
	const [progress, setProgress] = useState(0);
	const router = useRouter();
	const pathname = usePathname();
	const { userInfo } = useAuth();

	const clientAction = async (formData) => {
		setLoading(true);
		// const data = await createAction(formData);
		let { data } = await Axios.post(
			"/api/admin/create-prize-distribution",
			formData,
			{
				onUploadProgress: (progressEvent) => {
					const prog = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total,
					);
					setProgress(prog);
				},
			},
		);
		setLoading(false);
		if (data?.success) {
			Swal.fire("Success", data?.message, "success");
			setProgress(0);
			router.refresh(pathname);
			setPicture("");
			// toast.success(data?.message);
		} else {
			Swal.fire("Error", data?.message, "error");
			setProgress(0);
			router.refresh(pathname);
			// toast.error(data?.message);
			// toast.error(data?.message);
		}
	};
	return (
		<div className="my-2 relative">
			{/* The button to open modal */}
			<label
				htmlFor="CreateProductModal"
				className={userInfo?.role !== "admin" ? "hidden" : "btn btn-primary"}
			>
				{loading ? "Submitting" : "Add Image"}
			</label>

			{/* Put this part before </body> tag */}
			<input type="checkbox" id="CreateProductModal" className="modal-toggle" />
			<div
				className="modal justify-start items-start md:items-center md:justify-center"
				role="dialog"
			>
				<div className="modal-box  max-h-fit mt-10">
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
									<label className="block" htmlFor="caption">
										Caption
									</label>
									<input
										className="input"
										type="text"
										id="caption"
										name="caption"
										required
										placeholder="Enter caption"
									/>
								</div>
								<div className="mt-3">
									<label className="block" htmlFor="name">
										Select images (maximum 3 mb)
									</label>
									<input
										onChange={(e) => {
											setPicture(e.target.files[0]);
										}}
										className="input"
										type="file"
										id="file"
										name="file"
										required
										multiple
									/>
								</div>
								<div className="mt-3">
									<ProgressBar progress={progress} color={"bg-blue-400"} />

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

export default AddImageModal;
