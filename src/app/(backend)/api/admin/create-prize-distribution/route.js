import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import dbConnect from "@/lib/helpers/dbConnect";
import { uploadOnCloudinary } from "@/lib/helpers/cloudinary";
import { revalidateTag } from "next/cache";
import { prizeModel } from "@/lib/models/prizeModel";

export async function POST(req) {
	let formData = await req.formData();

	const caption = formData.get("caption");
	const getFiles = formData.getAll("file");
	const files = getFiles.sort((a, b) => {
		return a.size - b.size;
	});
	try {
		if (files[0]?.size) {
			for (let file of files) {
				let fileNo = files.indexOf(file);
				if (file?.size > 3 * 1024 * 1000) {
					return Response.json({
						success: true,
						message: `${fileNo} of ${files?.length} ${fileNo > 1 ? "items" : "item"} added successfully. File too large, maximum 3 mb`,
					});
				}
				let { secure_url, public_id } = await uploadOnCloudinary(
					file,
					"afzal-school",
				);
				let url = { secure_url, public_id };
				await dbConnect();
				await prizeModel.create({
					caption,
					picture: url && url,
				});
			}
		}

		return Response.json({
			success: true,
			message: `${files?.length} ${files?.length > 1 ? "items" : "item"} Added successfully`,
		});
	} catch (error) {
		console.log(error);
		return Response.json({ message: await getErrorMessage(error) });
	} finally {
		revalidateTag("prize-list", { expire: 0 });
	}
}
