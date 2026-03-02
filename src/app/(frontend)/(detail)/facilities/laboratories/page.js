import Image from "next/image";

export const metadata = {
	title: "School history",
	description: "School history page",
};

const History = async () => {
	return (
		<div>
			<h2>Laboratories</h2>
			<hr />
			<p className=" text-justify py-2">
				We accentuate the practical education of the students. Practical classes
				are carried out form class VI onward. We have Physics, Chemistry,
				Biology, Agriculture studies, Home Science and ICT Laboratories. These
				Laboratories are well equipped with adequate resource materials
				necessary for practical demonstration. The cooling and interior
				environment of the Lab room is worth mentioning. Each Lab has a separate
				demonstration and there is a cleaner as well to ensure cleanliness.
			</p>
			<div className="mb-3">
				<figure>
					<Image
						className="w-250"
						width={1500}
						height={1000}
						priority={true}
						src="/ict1.png"
						alt="image"
					/>
					<figcaption>Our ict Lab Classroom</figcaption>
				</figure>
			</div>
			<div>
				<figure>
					<Image
						className="w-250"
						width={1500}
						height={1000}
						priority={true}
						src="/lab3.jpg"
						alt="image"
					/>
					<figcaption>Our Home Science Lab</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default History;
