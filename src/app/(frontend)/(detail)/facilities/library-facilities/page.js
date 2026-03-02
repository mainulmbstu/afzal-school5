import Image from "next/image";

export const metadata = {
	title: "School history",
	description: "School history page",
};

const History = async () => {
	return (
		<div>
			<h2>Library</h2>
			<hr />
			<p className=" text-justify py-2">
				The school has a rich library. Students use the library in the tiffin
				period, Students of full-time schooling after lunch and residential
				students in the afternoon. The library is enriched with newspapers,
				magazines, periodicals along with textual, co-textual, story, novel and
				general knowledge books. We have now 25,000 books in the library. The
				library is fully air conditioned.
			</p>
			<div className="mb-3">
				<figure>
					<Image
						className="w-250"
						width={1500}
						height={1000}
						priority={true}
						src="/lib1.png"
						alt="image"
					/>
					<figcaption>Library</figcaption>
				</figure>
			</div>
			<div className="mb-3">
				<figure>
					<Image
						className="w-250"
						width={1500}
						height={1000}
						priority={true}
						src="/lib.jpg"
						alt="image"
					/>
					<figcaption>Library</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default History;
