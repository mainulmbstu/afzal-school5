import { revalidatePath } from "next/cache";

export const wait = async (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
export const refreshAll = async () => {
	"use server";
	revalidatePath("/", "layout");
};
