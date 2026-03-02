import Image from "next/image";
import Link from "next/link";

const SpeechPage = ({ single }) => {
	return (
		<div>
			<h2 className=" uppercase text-justify"> {single?.designation} </h2>
			<hr />
			<div className="p-4 bg-base-200 rounded-lg whitespace-pre-line">
				<div className="flex justify-center mb-3">
					<Link href={single?.image || "/dummy.jpeg"} target="_blank">
						<Image
							className=" max-h-112 object-contain"
							width={1500}
							height={1000}
							priority={true}
							src={single?.image || "/dummy.jpeg"}
							alt={single?.name}
						/>
					</Link>
				</div>
				<div>
					<h3 className=" uppercase mb-2">{single?.designation}'s Message</h3>
					<h4> {single?.greeting} </h4>
					<p className="text-justify"> {single?.speech} </p>
					<h5 className="mt-2"> {single?.name} </h5>
					<p> {single?.designation} </p>
					<p> {single?.email} </p>
				</div>
			</div>
		</div>
	);
};

export default SpeechPage;
