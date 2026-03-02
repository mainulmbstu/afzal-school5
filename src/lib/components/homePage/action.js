"use server";

import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { NewsModel } from "@/lib/models/newsModel";

//===========================================================
export const createAction = async (formData) => {
	const news = formData.get("news");
	try {
		await dbConnect();
		await NewsModel.deleteMany();
		await NewsModel.create({
			news,
		});
		// updateTag("news-list");
		// revalidatePath("/admin/governing-body", { expire: 0 });
		return {
			success: true,
			message: `News has been changed successfully`,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
//===========================================================
export const getNews = async () => {
	"use cache";
	cacheLife("minutes");
	cacheTag("news-list");

	try {
		await dbConnect();

		const list = await NewsModel.findOne();
		// console.log(list);
		return {
			success: true,
			single: JSON.stringify(list),
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
//===========================================================
