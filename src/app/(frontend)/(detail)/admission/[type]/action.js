"use server";

import { cacheLife, cacheTag, updateTag } from "next/cache";
import {
	deleteImageOnCloudinary,
	uploadOnCloudinary,
} from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { admissionModel } from "@/lib/models/admissionModel";

//===========================================================
export const getAction = async (type) => {
	// "use cache";
	// cacheLife("days");
	// cacheTag("result-list");
	try {
		await dbConnect();

		const list = await admissionModel.findOne({
			type: type?.toLowerCase(),
		});
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
	const type = formData.get("type");
	const title = formData.get("title");
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
		const itemExist = await admissionModel.findOneAndDelete({
			type: type?.toLowerCase(),
		});
		itemExist?.picture?.public_id &&
			(await deleteImageOnCloudinary(itemExist?.picture?.public_id));
		await admissionModel.create({
			title,
			type,
			file: url && url,
		});
		// revalidatePath("/admin/governing-body", { expire: 0 });
		return {
			success: true,
			message: `Added ${type} successfully`,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("admission-list");
	}
};
