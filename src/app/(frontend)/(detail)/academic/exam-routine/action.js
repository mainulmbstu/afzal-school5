"use server";

import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";
import {
	deleteImageOnCloudinary,
	uploadOnCloudinary,
} from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { ExamModel } from "@/lib/models/examModel";

//===========================================================
export const getAllAction = async (page, perPage) => {
	"use cache";
	cacheLife("days");
	cacheTag("exam-list");
	let skip = (page - 1) * perPage;
	try {
		await dbConnect();

		const total = await ExamModel.find({}).countDocuments();
		const list = await ExamModel.find({})
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
export const createAction = async (formData) => {
	const title = formData.get("title");
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
		await ExamModel.create({
			title,
			className,
			file: url && url,
		});
		return {
			success: true,
			message: `Added ${title} in  notice board successfully`,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("exam-list");
		// revalidatePath("/admin/governing-body", { expire: 0 });
	}
};

//==============================
export const deleteAction = async (id = "") => {
	try {
		await dbConnect();

		const itemExist = await ExamModel.findByIdAndDelete(id);
		itemExist?.file?.public_id &&
			(await deleteImageOnCloudinary(itemExist?.file?.public_id));

		return {
			message: `${itemExist?.title} routine has been deleted successfully`,
			success: true,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("exam-list");
	}
};
