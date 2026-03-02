const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
	{
		caption: { type: String, required: true, trim: true },
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

export const prizeModel =
	mongoose.models?.prizes || mongoose.model("prizes", Schema);
