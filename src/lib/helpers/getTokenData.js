"use server";

import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_KEY);
export const getTokenData = async (token) => {
	try {
		if (!token) {
			return null;
		}
		const { payload } = await jwtVerify(token, secretKey);
		return payload?.userInfo;
	} catch (error) {
		console.log("getTokenData error", error.message);
		return null;
	}
};
