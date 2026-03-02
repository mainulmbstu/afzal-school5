import Link from "next/link";

import { getAction } from "./action";
import AddModal from "./AddModal";
import { checkPdf } from "@/lib/helpers/checkPdf";
import Image from "next/image";
import getBase64 from "@/lib/helpers/plaiceholder";

// export const metadata = {
// 	title: "Leaflet",
// 	description: "Leaflet page",
// };
export const generateMetadata = async ({ params }) => {
	let { className } = await params;
	const data = await getAction(className);
	const single = data?.success && JSON.parse(data?.list);
	return {
		title: `${single?.className?.toUpperCase()} | RESULT`,
		description: `${single?.className} page`,
	};
};
const MainPage = async ({ params }) => {
	let { className } = await params;
	const data = await getAction(className);
	const single = data?.success && JSON.parse(data?.list);
	// let ispdf = entries?.length && entries[0]?.file.secure_url?.endsWith(".pdf");
	let blurData = await getBase64("");
	let isPdf = await checkPdf(single?.file?.secure_url);
	return (
		<div>
			<h2 className=" uppercase">{single?.className}</h2>
			<hr />
			<div className=" card p-2 mt-5">
				<AddModal className={className} />
				{/* <h4>Total Sale: {<PriceFormat price={totalPrice} />}</h4> */}
			</div>

			{/* <iframe src={entries[0].file.secure_url} width="100%" height="600px">
				Your browser does not support iframes.{" "}
				<a href="yourfile.pdf">Download the PDF</a>.
			</iframe> */}
			<div className=" ">
				<h3 className=" bg-green-400 text-center animate-bounce">
					{single?.title}
				</h3>
				{isPdf ? (
					<object
						data={single?.file?.secure_url}
						type="application/pdf"
						width="100%"
						// height="1000px"
						className=" h-screen "
					>
						<p>
							Your browser does not support PDFs.{" "}
							<a href={single?.file?.secure_url}>Download the PDF</a>.
						</p>
					</object>
				) : (
					<Link
						href={single?.file?.secure_url || "/dummy.jpeg"}
						target="_blank"
					>
						<Image
							className=" max-h-screen object-contain"
							blurDataURL={blurData}
							placeholder={blurData && "blur"}
							width={2500}
							height={1500}
							priority={true}
							src={single?.file?.secure_url || "/dummy.jpeg"}
							alt={"image"}
						/>
					</Link>
				)}
			</div>
		</div>
	);
};

export default MainPage;
