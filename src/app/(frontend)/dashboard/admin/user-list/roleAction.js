"use server";

import { revalidatePath, updateTag } from "next/cache";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { UserModel } from "@/lib/models/userModel";

export const roleAction = async (value, id) => {
	try {
		await dbConnect();
		const userExist = await UserModel.findByIdAndUpdate(
			{ _id: id },
			{ role: value },
		);
		// revalidatePath("/dashboard/admin/user-list");
		updateTag("user-list");

		return {
			message: `${userExist?.name} has been updated successfully`,
			success: true,
		};
	} catch (error) {
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
