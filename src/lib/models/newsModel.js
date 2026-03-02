import mongoose from "mongoose";

const Schema = new mongoose.Schema(
	{
		news: { type: String, required: true },
	},
	// { timestamps: true },
);

export const NewsModel =
	mongoose.models?.newses || mongoose.model("newses", Schema);
