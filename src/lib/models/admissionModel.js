// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		type: { type: String, required: true, trim: true, lowercase: true },
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

export const admissionModel =
	mongoose.models?.admissions || mongoose.model("admissions", Schema);
