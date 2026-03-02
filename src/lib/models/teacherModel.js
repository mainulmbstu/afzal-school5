// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
	{
		uniqueid: { type: String, required: true, trim: true },
		name: { type: String, required: true, trim: true },
		phone: { type: String, required: true, trim: true },
		email: { type: String, unique: true, required: true, trim: true },

		designation: { type: String, required: true },
		department: { type: String, required: true },
		joiningdate: { type: Date },

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

export const TeacherModel =
	mongoose.models?.teachers || mongoose.model("teachers", Schema);
