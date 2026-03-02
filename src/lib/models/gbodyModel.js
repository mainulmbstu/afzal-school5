// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		designation: { type: String, required: true },
		address: { type: String, required: true },
		picture: {
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

export const GbodyModel =
	mongoose.models?.gbodies || mongoose.model("gbodies", Schema);
