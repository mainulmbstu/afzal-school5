import Image from "next/image";

export const metadata = {
	title: "Vision",
	description: "Vision page",
};

const Vision = async () => {
	return (
		<div>
			<h2 className="">Vision</h2>
			<hr />
			<div>
				<Image
					className="w-full"
					width={1500}
					height={1000}
					priority={true}
					src="/schl2.jpg"
					alt="image"
				/>
			</div>
			<h3 className="my-3">Vision</h3>
			<p className=" text-justify">
				- To enable the students to learn and lead in academic frontier.
				<br /> - To inculcate the seedlings of humanitarian values and ideal
				citizens.
				<br /> - To be a distinctive and successful college in terms of success
				in pubic examinations.
				<br /> - To enhance the potential of the students to the fullest by
				systematically exploring their latent talents.
				<br /> - To transform the art of teaching to a level where acquiring
				knowledge, both academic and practical, becomes a habit for the
				students.
				<br /> - To develop students to be independent learners. - To develop
				committed, high performing teaching faculties.
			</p>
		</div>
	);
};

export default Vision;
