"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "./context";

const DeleteModal = ({ value }) => {
	const ref = useRef();
	const { userInfo } = useAuth();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const deleteFunc = async () => {
		try {
			if (userInfo?._id === value?.id) {
				return Swal.fire("Error", "You cannot delete yourself", "error");
			}
			setLoading(true);
			const data = await value.action(value?.id);
			if (data?.success) {
				toast.success(data?.message);
				// router.refresh(pathname);
				value?.redirect && router.push(value?.redirect);
			} else {
				Swal.fire("Error", data?.message, "error");
			}
		} catch (error) {
			toast.error(error?.message);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className={userInfo?.role !== "admin" ? "hidden" : ""}>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<button
				disabled={loading}
				className="btn btn-link text-red-600 "
				onClick={() => ref.current.showModal()}
				// onClick={() => document.getElementById("my_modal_1").showModal()}
			>
				{loading ? "Deleting" : `${value?.name || "Delete"}`}
			</button>
			<dialog ref={ref} id="my_modal_1" className="modal">
				<div className="modal-box max-w-full w-100">
					<h3 className="font-bold text-lg">Delete confirmation</h3>
					<p className="py-4">{value?.message}</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								✕
							</button>
							{/* if there is a button in form, it will close the modal */}
							<button onClick={deleteFunc} type="submit" className="btn">
								yes
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
};

export default DeleteModal;
