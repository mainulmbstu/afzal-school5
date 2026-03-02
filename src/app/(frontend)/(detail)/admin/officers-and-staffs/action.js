"use server";

import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";
import {
	deleteImageOnCloudinary,
	uploadOnCloudinary,
} from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { offStaffModel } from "@/lib/models/offStaffModel";

//===========================================================
export const getAllAction = async () => {
	"use cache";
	cacheLife("days");
	cacheTag("offStaff-list");
	try {
		await dbConnect();

		const list = await offStaffModel.find({}).sort({ createdAt: -1 });
		return {
			success: true,
			list: JSON.stringify(list),
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
//===========================================================
export const createAction = async (formData) => {
	const uniqueid = formData.get("uniqueid");
	const name = formData.get("name");
	const email = formData.get("email");
	const designation = formData.get("designation");
	const department = formData.get("department");
	const joiningdate = formData.get("joiningdate");
	const file = formData.get("file");

	try {
		let url = "";
		if (file?.size) {
			if (file?.size > 3 * 1024 * 1000) {
				return {
					success: false,
					message: `File too large, maximum 3 mb`,
				};
			}
			if (file?.size) {
				const { secure_url, public_id } = await uploadOnCloudinary(
					file,
					"afzal-school",
				);
				url = { secure_url, public_id };
			}
		}
		await dbConnect();
		await offStaffModel.create({
			uniqueid,
			name,
			email,
			designation,
			department,
			joiningdate,
			picture: url && url,
		});
		// revalidatePath("/admin/governing-body", { expire: 0 });
		return {
			success: true,
			message: `Added ${name} as ${designation} successfully`,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("offStaff-list");
	}
};

//==============================
export const deleteAction = async (id = "") => {
	try {
		await dbConnect();

		const itemExist = await offStaffModel.findByIdAndDelete(id);
		itemExist?.picture?.public_id &&
			(await deleteImageOnCloudinary(itemExist?.picture?.public_id));

		return {
			message: `${itemExist?.name} has been deleted successfully`,
			success: true,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("offStaff-list");
	}
};
