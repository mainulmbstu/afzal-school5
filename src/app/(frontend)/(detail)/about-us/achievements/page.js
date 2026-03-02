import Image from "next/image";

export const metadata = {
	title: "Achievements",
	description: "Achievements page",
};

const Achievements = async () => {
	return (
		<div>
			<h2 className="">Achievements</h2>
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
			<h3 className="my-3">Achievements</h3>
		</div>
	);
};

export default Achievements;
