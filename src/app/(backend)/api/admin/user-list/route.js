import dbConnect from "@/lib/helpers/dbConnect";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import { UserModel } from "@/lib/models/userModel";

export async function GET(req) {
	const keyword = req.nextUrl.searchParams.get("keyword");
	const page = req.nextUrl.searchParams.get("page");
	const perPage = req.nextUrl.searchParams.get("perPage");
	const skip = (page - 1) * perPage;
	try {
		await dbConnect();
		const total = await UserModel.find(
			{
				$or: [
					{ email: { $regex: keyword, $options: "i" } },
					{ name: { $regex: keyword, $options: "i" } },
					{ phone: { $regex: keyword, $options: "i" } },
				],
			},
			{ password: 0 },
		);

		const userList = await UserModel.find(
			{
				$or: [
					{ email: { $regex: keyword, $options: "i" } },
					{ name: { $regex: keyword, $options: "i" } },
					{ phone: { $regex: keyword, $options: "i" } },
				],
			},
			{ password: 0 },
		)
			.skip(skip)
			.limit(perPage)
			.sort({ createdAt: -1 });

		return Response.json({ userList, total: total?.length });
	} catch (error) {
		console.log(error);
		return Response.json({ message: await getErrorMessage(error) });
	}
}
