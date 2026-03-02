import bcrypt from "bcryptjs";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import {
	deleteImageOnCloudinary,
	uploadOnCloudinary,
} from "@/lib/helpers/cloudinary";
import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import mailer from "@/lib/helpers/nodeMailer";
import { UserModel } from "@/lib/models/userModel";

export async function POST(req) {
	// await new Promise(resolve => {
	//   setTimeout(resolve, 5000)
	// })
	const formData = await req.formData();

	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");
	const phone = formData.get("phone");
	const address = formData.get("address");
	//for image
	const file = formData.get("file");
	try {
		await dbConnect();
		const userExist = await UserModel.findOne({ email });
		if (!userExist) {
			return { message: "User not found" };
		}

		if (file?.size) {
			userExist.picture?.public_id &&
				(await deleteImageOnCloudinary(userExist.picture?.public_id));
			const { secure_url, public_id } = await uploadOnCloudinary(
				file,
				"profile",
			);
			userExist.picture = { secure_url, public_id };
		}
		if (name) userExist.name = name;
		if (phone) userExist.phone = phone;
		if (address) userExist.address = address;
		if (password) userExist.password = await bcrypt.hash(password, 10);

		(await cookies()).delete("token");
		(await cookies()).delete("userInfo");
		await userExist.save();

		// console.log(userExist);
		const credential = {
			email,
			subject: "Profile Update ",
			body: `<h2>Hi ${userExist?.name},</h2>
      <h3>Your profile has been Updated successfully.
      Thanks for staying with us`,
		};
		mailer(credential);

		return Response.json({
			success: true,
			message: `Profile Update successful, Please login again`,
		});
	} catch (error) {
		console.log(error);
		return Response.json({ message: await getErrorMessage(error) });
	} finally {
		revalidateTag("user-list", { expires: 0 });
	}
}
