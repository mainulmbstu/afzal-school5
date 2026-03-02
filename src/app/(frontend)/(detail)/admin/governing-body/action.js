"use server";

import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";
import {
	deleteImageOnCloudinary,
	uploadOnCloudinary,
} from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { GbodyModel } from "@/lib/models/gbodyModel";

//===========================================================
export const getAllAction = async () => {
	"use cache";
	cacheLife("days");
	cacheTag("gbody-list");

	try {
		await dbConnect();

		const list = await GbodyModel.find({}).sort({ createdAt: -1 });
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
	const designation = formData.get("designation");
	const name = formData.get("name");
	const address = formData.get("address");
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
		await GbodyModel.create({
			name,
			designation,
			address,
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
		updateTag("gbody-list");
	}
};

//==============================
export const deleteAction = async (id = "") => {
	try {
		await dbConnect();

		const itemExist = await GbodyModel.findByIdAndDelete(id);
		itemExist?.picture?.public_id &&
			(await deleteImageOnCloudinary(itemExist.picture?.public_id));

		return {
			message: `${itemExist?.name} has been deleted successfully`,
			success: true,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	} finally {
		updateTag("gbody-list");
	}
};
