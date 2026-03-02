import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";
import dbConnect from "@/lib/helpers/dbConnect";
import { UserModel } from "@/lib/models/userModel";

export const metadata = {
	title: "Verify email",
	description: "Verify email page",
};

const VerifyEmail = async ({ searchParams }) => {
	const { verifyToken } = await searchParams;
	const tokenData = jwt.verify(verifyToken, process.env.JWT_KEY);
	let success = false;
	let message = "";
	//   console.log(message);
	try {
		await dbConnect();
		const user = await UserModel.findById(tokenData?.id);
		if (user) {
			user.isVerified = true;
			if (user.verifyTokenExpire) user.verifyTokenExpire = undefined;
			await user.save();
			message = "email verified successfully";
			success = true;
			revalidatePath("/dashboard", "layout");
		} else {
			message =
				"email verification failed, may be due to token validity expired, please register again";
		}
	} catch (error) {
		console.log(error);
		message = error?.message?.toString();
	}

	return (
		<div className=" h-screen flex justify-center items-center text-center">
			<div>
				<h3>
					{" "}
					{success ? "✅" : "❌"} {message}{" "}
				</h3>
				{success ? (
					<Link className="btn btn-primary" href={"/user/login"}>
						Click Here to Login
					</Link>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
