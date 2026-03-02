import Image from "next/image";

export const metadata = {
	title: "School history",
	description: "School history page",
};

const History = async () => {
	return (
		<div>
			<h2>Transports</h2>
			<hr />
			<p className=" text-justify py-2">
				We offer transport facilities for day-shift students. Currently 550
				students are using school transport.
			</p>
			<div className="mb-3">
				<figure>
					<Image
						className="w-250"
						width={1500}
						height={1000}
						priority={true}
						src="/trans2.webp"
						alt="image"
					/>
					<figcaption>School Transport</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default History;
