"use server";

import { cacheLife, cacheTag, updateTag } from "next/cache";
import {
	deleteImageOnCloudinary,
	uploadOnCloudinary,
} from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { RoutineModel } from "@/lib/models/routineModel";

//===========================================================
export const getAllAction = async () => {
	"use cache";
	cacheLife("days");
	cacheTag("routine-list");
	try {
		await dbConnect();

		const list = await RoutineModel.find({}).sort({ createdAt: -1 });
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
	const className = formData.get("className");

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
		await RoutineModel.create({
			className,
			file: url && url,
		});
		// revalidatePath("/admin/governing-body", { expire: 0 });
		return {
			success: true,
			message: `Added ${className} routine successfully`,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("routine-list");
	}
};

//==============================
export const deleteAction = async (id = "") => {
	try {
		await dbConnect();

		const itemExist = await RoutineModel.findByIdAndDelete(id);
		itemExist?.picture?.public_id &&
			(await deleteImageOnCloudinary(itemExist?.picture?.public_id));

		return {
			message: `Class ${itemExist?.class} routine has been deleted successfully`,
			success: true,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("routine-list");
	}
};
