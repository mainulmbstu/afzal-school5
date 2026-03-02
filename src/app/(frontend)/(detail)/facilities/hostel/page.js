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
				We take full care of each and every student of the hostel, their proper
				grooming-up, physical training for the students, religious & moral
				education etc. we provide special coaching for the academically poor
				students. 1500 students are presently staying in the hostel. We have
				Hostel Supers and under them there are 45 Assistant Hostel supers. There
				is an exclusive Girls’ hostel under the supervision of a Lady Hostel
				Super and 10 Assistant Hostel Supers.
			</p>
			<div className="mb-3">
				<figure>
					<Image
						className="w-250"
						width={1500}
						height={1000}
						priority={true}
						src="/hostel.jpg"
						alt="image"
					/>
					<figcaption>
						Hostel Administrator, Directors, Manager & Hostel Super
					</figcaption>
				</figure>
			</div>
			<div className="mb-3">
				<figure>
					<Image
						className="w-250"
						width={1500}
						height={1000}
						priority={true}
						src="/hostel2.avif"
						alt="image"
					/>
					<figcaption>Hostel</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default History;
