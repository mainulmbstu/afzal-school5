import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { useAuth } from "./lib/components/context";
import { getTokenData } from "./lib/helpers/getTokenData";

export async function proxy(request) {
	const token = request.cookies.get("token")?.value; // get cookies
	const userInfo = await getTokenData(token);
	// var userInfo = jwt.verify(token, process.env.JWT_KEY);
	// console.log(process.env.JWT_KEY);
	const path = request.nextUrl.pathname;
	const search = request.nextUrl.searchParams;
	const lastPath = search.get("lastPath");
	const publicPaths = path === "/user/login" || path === "/user/register";
	// || path === "/";

	if (publicPaths) {
		if (userInfo) {
			if (lastPath) {
				return NextResponse.redirect(new URL(lastPath, request.url));
			}
			if (path !== "/") {
				return NextResponse.redirect(new URL("/", request.url));
			}
		}
	} else {
		if (!userInfo) {
			return NextResponse.redirect(new URL("/user/login", request.url));
		} else if (userInfo?.role !== "admin") {
			if (path.startsWith("/dashboard/admin")) {
				return NextResponse.redirect(new URL("/dashboard/user", request.url));
			}
		}
	}
	const response = NextResponse.next();
	response.cookies.set("pathname", path);
	response.cookies.set("search", request.nextUrl.search);
	return response;
	// const headers = new Headers(request.headers);
	// headers.set("cpath", path);
	// return NextResponse.next({ headers });
}

// See "Matching Paths" below to learn more
export const config = {
	// matcher: ['/','/:path*'],
	matcher: [
		// "/",
		"/about",
		"/dashboard/:path*",
		"/user/login/:path*",
		"/user/register/:path*",
		"/post/:path*",
	],

	// matcher: [
	//   // match all routes except static files and APIs
	//   "/((?!api|_next/static|_next/image|favicon.ico).*)",
	// ],
};

// return NextResponse.next({
//   request: {
//     // New request headers
//     headers: requestHeaders,
//   },
// });
