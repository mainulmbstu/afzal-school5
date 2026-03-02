"use server";

import { cacheLife, cacheTag, updateTag } from "next/cache";
import { deleteImageOnCloudinary } from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { ImageModel } from "@/lib/models/imageModel";

//===========================================================
export const getAllAction = async (page, perPage) => {
	"use cache";
	cacheLife("days");
	cacheTag("image-list");
	let skip = (page - 1) * perPage;
	try {
		await dbConnect();

		const total = await ImageModel.find({}).countDocuments();
		const list = await ImageModel.find({})
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
export const deleteAction = async (ids = []) => {
	try {
		if (!ids.length) {
			return {
				success: false,
				message: `No image has been selected`,
			};
		}
		await dbConnect();
		for (let id of ids) {
			const itemExist = await ImageModel.findByIdAndDelete(id);
			itemExist?.picture?.public_id &&
				(await deleteImageOnCloudinary(itemExist?.picture?.public_id));
		}
		return {
			success: true,
			message: `${ids?.length} ${ids?.length > 1 ? "items have" : "item has"} been deleted successfully`,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("image-list");
	}
};
