// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		className: { type: String, required: true, trim: true },

		file: {
			secure_url: {
				type: String,
				default:
					"https://res.cloudinary.com/dgj1icpu7/image/upload/v1731421057/ks1yrpyy3iy2rzpp2m4c.jpg",
			},
			public_id: { type: String },
		},
	},
	{ timestamps: true },
);

export const ExamModel =
	mongoose.models?.exams || mongoose.model("exams", Schema);
