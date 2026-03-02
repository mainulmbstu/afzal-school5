"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { UserModel } from "@/lib/models/userModel";

export const loginAction = async (formData) => {
	// await new Promise(resolve => {
	//   setTimeout(resolve, 5000)
	// })

	const email = formData.get("email");
	const password = formData.get("password");
	if (!email || !password) {
		return { message: "Please enter all required fields" };
	}
	try {
		await dbConnect();
		const user = await UserModel.findOne({ email });
		if (!user) {
			return { message: "User does not exist" };
		}
		if (!user.isVerified) {
			return { message: "Email is not verified" };
		}
		const passMatch = await bcrypt.compare(password, user.password);
		if (!passMatch) {
			return { message: "Wrong credentials" };
		}
		const userInfo = await UserModel.findOne({ email }, { password: 0 });
		const token = jwt.sign({ userInfo }, process.env.JWT_KEY);
		// let token = jwt.sign(
		//   { id: user?._id, email: user?.email, role: user?.role },
		//   process.env.JWT_KEY
		// );
		(await cookies()).set("token", token, {
			// httpOnly: true,
			maxAge: 3600 * 24,
		}); // expiry time in second
		// (await cookies()).set("userInfo", JSON.stringify(userInfo), {
		//   // httpOnly: true,
		//   maxAge: 3600 * 24,
		// }); // expiry time in second
		// revalidatePath("/", "layout");
		// redirect("/cart");
		return {
			success: true,
			message: `Login successful `,
			token,
			userInfo: JSON.stringify(userInfo),
		};
	} catch (error) {
		// if u use redirect in try block
		// if (error.message === "NEXT_REDIRECT") throw error;
		console.log(error);
		return { message: await getErrorMessage(error) };
	}
};
