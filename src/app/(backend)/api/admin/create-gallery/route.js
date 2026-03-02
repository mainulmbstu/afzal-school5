import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/helpers/getErrorMessage";
import dbConnect from "@/lib/helpers/dbConnect";
import { uploadOnCloudinary } from "@/lib/helpers/cloudinary";
import { ImageModel } from "@/lib/models/imageModel";
import { revalidateTag } from "next/cache";

export async function POST(req) {
	let formData = await req.formData();

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
				await ImageModel.create({
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
		revalidateTag("image-list", { expire: 0 });
	}
}
