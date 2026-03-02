"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

const Carousel2 = ({ slides, autoPlay = false, interval = 3000 }) => {
	return (
		<div className="flex justify-center mb-2">
			<div className="max-w-4/5 ">
				<Carousel
					showThumbs={false}
					autoPlay={autoPlay}
					infiniteLoop
					interval={interval}
				>
					{slides?.map((slide, index) => (
						<div key={index} className="">
							{/* <img className=" object-contain max-h-72" src={slide} /> */}
							<Image
								className="max-h-160 object-contain"
								width={1500}
								height={1000}
								priority={true}
								src={slide}
								alt={"image"}
							/>
							{/* <p className="legend">Legend {index + 1}</p> */}
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default Carousel2;
