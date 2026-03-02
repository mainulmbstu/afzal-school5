"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "@/lib/components/context";
import { roleAction } from "./roleAction";

const Role = ({ role, id }) => {
	const { userInfo } = useAuth();
	const [loading, setLoading] = useState(false);
	//   let [value, setValue] = useState('');

	const roleHandle = async (value, id) => {
		try {
			if (userInfo?._id === id) {
				return Swal.fire("Error", "You cannot update yourself", "error");
			}
			setLoading(true);
			const data = await roleAction(value, id);
			setLoading(false);
			if (data?.success) {
				toast.success(data?.message);
			}
		} catch (error) {
			toast.error(error?.message);
			console.log(error);
		}
	};
	return (
		<div>
			<select
				onChange={(e) => roleHandle(e.target.value, id)}
				defaultValue={role}
				name="role"
				className="select"
			>
				<option disabled={true}>{role}</option>
				<option>user</option>
				<option>admin</option>
			</select>
		</div>
	);
};

export default Role;
