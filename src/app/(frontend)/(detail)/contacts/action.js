"use server";

import { cacheLife, cacheTag, revalidatePath, updateTag } from "next/cache";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { ContactModel } from "@/lib/models/ContactModel";

//===========================================================
export const contactAction = async (formData) => {
	const name = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");
	try {
		await dbConnect();
		await ContactModel.create({ name, email, message });
		// revalidatePath("/", "layout");
		updateTag("contacts");
		return {
			success: true,
			message: `message has been sent successfully`,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
//===========================================================
export const getMessageAction = async (page = 1, perPage, userInfo) => {
	"use cache";
	cacheLife("days");
	cacheTag("contacts");
	const skip = (page - 1) * perPage;
	try {
		// let userInfo = await getTokenData(await getCookieValue("token"));
		await dbConnect();
		const total = await ContactModel.find({ email: userInfo?.email });
		const list = await ContactModel.find({ email: userInfo?.email })
			.skip(skip)
			.limit(perPage)
			.sort({ updatedAt: -1 });
		return { success: true, list: JSON.stringify(list), total: total?.length };
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
