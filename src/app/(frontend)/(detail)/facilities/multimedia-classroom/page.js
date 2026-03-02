import Image from "next/image";

export const metadata = {
	title: "School history",
	description: "School history page",
};

const History = async () => {
	return (
		<div>
			<h2>Multimedia Classroom</h2>
			<hr />
			<div>
				<Image
					className="w-250"
					width={1500}
					height={1000}
					priority={true}
					src="/mc.jpg"
					alt="image"
				/>
			</div>
			<p className=" text-justify py-2">
				The education initiatives by access to information project aim to make
				teaching and learning more effective and enjoyable for both students and
				teachers using ICT. To achieve this goal Milestone College establish
				multimedia class room with PC/Laptop and multi-media projector. We have
				22 multimedia class rooms with multimedia projector in college section.
				We have also 08 ICT Lab with multimedia projector. It also uses as
				multimedia if needed. In school sections we have — multimedia classroom.
				All multimedia classes are performed by a monthly routine. We hope these
				multimedia class room will improve overall quality of education by
				promoting effective & participatory learning as well as eliminate
				unnecessary memorizing tendency.
			</p>
		</div>
	);
};

export default History;
