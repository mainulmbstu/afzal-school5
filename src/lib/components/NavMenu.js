/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "./context";
import { navMenuHelper } from "./NavMenuHelper";
import slugify from "slugify";

const NavMenu = () => {
	const [isMenuOpen, setisMenuOpen] = useState(false);
	const [menuHelper, setMenuHelper] = useState("");
	const [drop1, setdrop1] = useState(false);
	const [drop2, setdrop2] = useState(false);
	const [drop3, setdrop3] = useState(false);
	const [drop4, setdrop4] = useState(false);
	const [drop5, setdrop5] = useState(false);
	const [drop6, setdrop6] = useState(false);
	const [drop7, setdrop7] = useState(false);
	const [drop8, setdrop8] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { userInfo, setUserInfo, setToken } = useAuth();

	useEffect(() => {
		let mm = async () => {
			let helper = await navMenuHelper();
			setMenuHelper(helper);
		};
		mm();
		setMounted(true);
	}, []);

	const menuClose = () => setisMenuOpen(false);
	const router = useRouter();
	const path = usePathname();

	if (!mounted) {
		return null;
	}

	return (
		<div className=" bg-blue-400">
			<div className=" max-w-400 m-auto h-12 md:h-35  shadow-lg flex  justify-between md:items-center p-2  bg-blue-400 dark:text-white">
				<div className="">
					<Link href="/">
						<Image
							className=" rounded-full h-full w-full"
							width={100}
							height={100}
							priority={true}
							src={"/afzal3.jpg"}
							alt={"image"}
						/>
					</Link>
				</div>
				<div className=" grid content-between  h-full">
					<div
						className={`transition-all  duration-500 ${
							isMenuOpen ? " flex-1 bg-base-300" : ""
						}`}
					>
						<nav className="relative h-fit uppercase z-20">
							<ul
								className={`${
									isMenuOpen
										? "flex flex-col scale-y-100 pt-12 text-center bg-zinc-200 transition-all  duration-500"
										: "scale-y-0"
								} md:flex justify-between md:gap-6 md:scale-y-100`}
							>
								<li className=" border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
									<Link
										className={path === "/" ? "underline text-blue-700" : ""}
										onClick={menuClose}
										href={"/"}
									>
										Home
									</Link>
								</li>
								<li
									onClick={() => setdrop1(!drop1)}
									className={`relative cursor-pointer  border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all ${path.startsWith("/about-us") ? "bg-zinc-300 text-blue-700 underline" : ""}`}
								>
									<span className=" flex justify-center gap-2">
										about us
										<IoIosArrowDown
											className={`mt-1 ${drop1 ? "rotate-180" : ""}`}
										/>{" "}
									</span>
									<ul
										className={`absolute top-full z-20  md:left-0  w-full md:w-fit whitespace-nowrap origin-top duration-300 bg-blue-300 ${
											drop1 ? "scale-y-100" : "scale-y-0"
										}`}
									>
										{menuHelper?.about?.map((item, i) => (
											<li key={i}>
												<Link
													onClick={menuClose}
													className={` uppercase w-full inline-block p-2 hover:bg-blue-400 ${path.startsWith(`/about-us/${slugify(item)}`) ? "bg-blue-400 underline" : ""}`}
													href={`/about-us/${slugify(item)}`}
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</li>

								<li
									onClick={() => setdrop3(!drop3)}
									className={`relative cursor-pointer  border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all ${path.startsWith("/admin") ? "bg-zinc-300 text-blue-700 underline" : ""}`}
								>
									<span className=" flex justify-center gap-2">
										admin
										<IoIosArrowDown
											className={`mt-1 ${drop3 ? "rotate-180" : ""}`}
										/>{" "}
									</span>
									<ul
										className={`absolute top-full z-20  md:left-0  w-full md:w-fit whitespace-nowrap origin-top duration-300 bg-blue-300 ${
											drop3 ? "scale-y-100" : "scale-y-0"
										}`}
									>
										{menuHelper?.admin?.map((item, i) => (
											<li key={i}>
												<Link
													onClick={menuClose}
													className={` uppercase w-full inline-block p-2 hover:bg-blue-400 ${path.startsWith(`/admin/${slugify(item)}`) ? "bg-blue-400 underline" : ""}`}
													href={`/admin/${slugify(item)}`}
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</li>

								<li className=" border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
									<Link
										className={
											path === "/gallery" ? "underline text-blue-700" : ""
										}
										onClick={menuClose}
										href={"/gallery"}
									>
										Gallery
									</Link>
								</li>
								<li className=" border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
									<Link
										className={
											path === "/contacts" ? "underline text-blue-700" : ""
										}
										onClick={menuClose}
										href={"/contacts"}
									>
										Contact us
									</Link>
								</li>
								<li className=" border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
									<Link
										className={
											path === "/notice-board" ? "underline text-blue-700" : ""
										}
										onClick={menuClose}
										href={"/notice-board"}
									>
										notice board
									</Link>
								</li>

								{userInfo ? (
									<li
										onClick={() => setdrop2(!drop2)}
										className={`relative cursor-pointer  border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all `}
									>
										<span></span>
										<span
											className={`flex justify-center gap-2 ${path.startsWith("/dashboard") ? " text-blue-700 underline" : ""}`}
										>
											<Image
												priority={true}
												width={400}
												height={400}
												src={
													userInfo?.picture
														? userInfo?.picture?.secure_url
														: "/dummy.jpeg"
												}
												alt="image"
												className=" rounded-full w-8 h-8 object-contain"
											/>
											{userInfo?.name}
											<IoIosArrowDown
												className={`mt-1 ${drop2 ? "rotate-180" : ""}`}
											/>{" "}
										</span>
										<ul
											className={`absolute top-full z-20  md:right-0 bg-base-300 w-full md:w-fit whitespace-nowrap origin-top duration-300 ${
												drop2 ? "scale-y-100" : "scale-y-0"
											}`}
										>
											<li>
												<Link
													onClick={menuClose}
													className={
														path.startsWith(`/dashboard`)
															? "bg-zinc-300  w-full inline-block p-2 hover:bg-zinc-400 underline"
															: "w-full inline-block p-2 hover:bg-zinc-300"
													}
													href={
														userInfo?.role === "admin"
															? "/dashboard/admin"
															: "/dashboard/user"
													}
												>
													Dashboard
												</Link>
											</li>
											<li>
												{/** biome-ignore lint/a11y/useButtonType: <explanation> */}
												<button
													onClick={() => {
														Cookies.remove("token");
														setUserInfo(null);
														setToken(null);
														router.refresh("/");
													}}
													className={
														"w-full inline-block md:text-left p-2 hover:bg-zinc-300 cursor-pointer"
													}
												>
													Logout
												</button>
											</li>
										</ul>
									</li>
								) : (
									<li className=" border-b border-b-zinc-50 hover:inset-shadow-sm  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all">
										<Link
											className={
												path === "/user/login" ? "underline text-blue-700" : ""
											}
											onClick={menuClose}
											href={"/user/login"}
										>
											Login
										</Link>
									</li>
								)}
							</ul>
						</nav>
					</div>
					<div
						className={` transition-all  duration-500 ${
							isMenuOpen ? " flex-1 bg-base-300" : ""
						}`}
					>
						<nav className="relative h-fit  uppercase  md:py-3 px-2 md:bg-blue-300 dark:bg-black z-10">
							<ul
								className={`${
									isMenuOpen
										? "flex flex-col scale-y-100 pt-12 text-center  bg-blue-300 transition-all  duration-500"
										: "scale-y-0"
								} md:flex justify-between md:gap-6 md:scale-y-100`}
							>
								<li
									onClick={() => setdrop4(!drop4)}
									className={`relative cursor-pointer  hover:underline  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all ${path.startsWith("/academic") ? "bg-zinc-300 text-blue-700 underline" : ""}`}
								>
									<span className=" flex justify-center gap-2">
										academic
										<IoIosArrowDown
											className={`mt-1 ${drop4 ? "rotate-180" : ""}`}
										/>{" "}
									</span>
									<ul
										className={`absolute top-full z-20  md:left-0  w-full md:w-fit whitespace-nowrap origin-top duration-300 bg-zinc-200 ${
											drop4 ? "scale-y-100" : "scale-y-0"
										}`}
									>
										{menuHelper?.academic?.map((item, i) => (
											<li key={i}>
												<Link
													onClick={menuClose}
													className={` uppercase w-full inline-block p-2 hover:bg-blue-400 ${path.startsWith(`/academic/${slugify(item)}`) ? "bg-blue-400 underline" : ""}`}
													href={`/academic/${slugify(item)}`}
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</li>

								<li
									onClick={() => setdrop5(!drop5)}
									className={`relative cursor-pointer  hover:underline  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all ${path.startsWith("/admission") ? "bg-zinc-300 text-blue-700 underline" : ""}`}
								>
									<span className=" flex justify-center gap-2">
										admission
										<IoIosArrowDown
											className={`mt-1 ${drop5 ? "rotate-180" : ""}`}
										/>{" "}
									</span>
									<ul
										className={`absolute top-full z-20  md:left-0  w-full md:w-fit whitespace-nowrap origin-top duration-300 bg-zinc-200 ${
											drop5 ? "scale-y-100" : "scale-y-0"
										}`}
									>
										{menuHelper?.admission?.map((item, i) => (
											<li key={i}>
												<Link
													onClick={menuClose}
													className={` uppercase w-full inline-block p-2 hover:bg-blue-400 ${path.startsWith(`/admission/${slugify(item)}`) ? "bg-blue-400 underline" : ""}`}
													href={`/admission/${slugify(item)}`}
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</li>
								<li
									onClick={() => setdrop6(!drop6)}
									className={`relative cursor-pointer  hover:underline  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all ${path.startsWith("/result") ? "bg-zinc-300 text-blue-700 underline" : ""}`}
								>
									<span className=" flex justify-center gap-2">
										result
										<IoIosArrowDown
											className={`mt-1 ${drop6 ? "rotate-180" : ""}`}
										/>{" "}
									</span>
									<ul
										className={`absolute top-full z-20  md:left-0  w-full md:w-fit whitespace-nowrap origin-top duration-300 bg-zinc-200 ${
											drop6 ? "scale-y-100" : "scale-y-0"
										}`}
									>
										{menuHelper?.result?.map((item, i) => (
											<li key={i}>
												<Link
													onClick={menuClose}
													className={` uppercase w-full inline-block p-2 hover:bg-blue-400 ${path.startsWith(`/result/${slugify(item)}`) ? "bg-blue-400 underline" : ""}`}
													href={`/result/${slugify(item)}`}
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</li>
								<li
									onClick={() => setdrop7(!drop7)}
									className={`relative cursor-pointer  hover:underline  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all ${path.startsWith("/facilities") ? "bg-zinc-300 text-blue-700 underline" : ""}`}
								>
									<span className=" flex justify-center gap-2">
										facilities
										<IoIosArrowDown
											className={`mt-1 ${drop7 ? "rotate-180" : ""}`}
										/>{" "}
									</span>
									<ul
										className={`absolute top-full z-20  md:left-0  w-full md:w-fit whitespace-nowrap origin-top duration-300 bg-zinc-200 ${
											drop7 ? "scale-y-100" : "scale-y-0"
										}`}
									>
										{menuHelper?.facilities?.map((item, i) => (
											<li key={i}>
												<Link
													onClick={menuClose}
													className={` uppercase w-full inline-block p-2 hover:bg-blue-400 ${path.startsWith(`/facilities/${slugify(item)}`) ? "bg-blue-400 underline" : ""}`}
													href={`/facilities/${slugify(item)}`}
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</li>
								<li
									onClick={() => setdrop8(!drop8)}
									className={`relative cursor-pointer  hover:underline  py-2 md:py-0 hover:inset-shadow-indigo-300 transition-all ${path.startsWith("/co-curricular-activities") ? "bg-zinc-300 text-blue-700 underline" : ""}`}
								>
									<span className=" flex justify-center gap-2">
										co-curricular activities
										<IoIosArrowDown
											className={`mt-1 ${drop8 ? "rotate-180" : ""}`}
										/>{" "}
									</span>
									<ul
										className={`absolute top-full z-20  md:left-0  w-full md:w-fit whitespace-nowrap origin-top duration-300 bg-zinc-200 ${
											drop8 ? "scale-y-100" : "scale-y-0"
										}`}
									>
										{menuHelper?.curricular?.map((item, i) => (
											<li key={i}>
												<Link
													onClick={menuClose}
													className={` uppercase w-full inline-block p-2 hover:bg-blue-400 ${path.startsWith(`/co-curricular-activities/${slugify(item)}`) ? "bg-blue-400 underline" : ""}`}
													href={`/co-curricular-activities/${slugify(item)}`}
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className="md:hidden cursor-pointer">
					<span onClick={() => setisMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? (
							<CgCloseR className=" hover:scale-125 transition-all text-2xl " />
						) : (
							<FaBars className=" hover:scale-125 transition-all text-2xl " />
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default NavMenu;
