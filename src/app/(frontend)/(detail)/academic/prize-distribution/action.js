"use server";

import { cacheLife, cacheTag, updateTag } from "next/cache";
import { deleteImageOnCloudinary } from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { prizeModel } from "@/lib/models/prizeModel";

//===========================================================
export const getAllAction = async (page, perPage) => {
	"use cache";
	cacheLife("days");
	cacheTag("prize-list");
	let skip = (page - 1) * perPage;
	try {
		await dbConnect();

		const total = await prizeModel.find({}).countDocuments();
		const list = await prizeModel
			.find({})
			.skip(skip)
			.limit(perPage)
			.sort({ createdAt: -1 });
		return {
			success: true,
			list: JSON.stringify(list),
			total,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
//===========================================================

//==============================
export const deleteAction = async (id = "") => {
	try {
		await dbConnect();

		const itemExist = await prizeModel.findByIdAndDelete(id);
		itemExist?.file?.public_id &&
			(await deleteImageOnCloudinary(itemExist?.file?.public_id));

		return {
			message: `${itemExist?.caption} has been deleted successfully`,
			success: true,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("prize-list");
	}
};
