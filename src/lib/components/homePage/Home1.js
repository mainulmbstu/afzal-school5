import Carousel2 from "@/lib/components/carousel2";
import Sidebar from "../Sidebar";
import AddNewsModal from "./AddNewsModal";
import News from "./News";
import { Suspense } from "react";
import { refreshAll } from "@/lib/helpers/helperFunction";
import { getTokenData } from "@/lib/helpers/getTokenData";
import { getCookieValue } from "@/lib/helpers/getCookieValue";

const Home1 = async () => {
	let userInfo = await getTokenData(await getCookieValue("token"));
	const slides = ["/schl1.jpg", "/schl2.jpg", "/schl3.jpg"];

	return (
		<div className="p-2">
			<button
				className={userInfo?.role !== "admin" ? "hidden" : "btn btn-primary"}
				onClick={refreshAll}
			>
				Refresh your total web
			</button>
			<h1 className="text-3xl text-center font-bold mb-4">
				Welcome to AFZAL SCHOOL
			</h1>
			<div className=" ">
				<Carousel2 slides={slides} autoPlay={true} interval={3000} />
			</div>
			<Suspense fallback="Loading news...">
				<News />
			</Suspense>
			<div>
				<AddNewsModal />
			</div>
			<div className=" grid md:grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-9">
					<h2 className=" font-bold mb-4">AFZAL SCHOOL</h2>
					<p className="text-justify">
						AFZAL SCHOOL is a premier educational institution dedicated to
						providing quality education and fostering holistic development in
						students. Our school is committed to nurturing young minds through
						innovative teaching methods, a supportive learning environment, and
						a strong emphasis on character building. <br />
						<br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Voluptas impedit doloribus laborum quis quo recusandae, ab a
						perspiciatis quae tempora magni aspernatur. Minima maiores voluptas
						beatae temporibus distinctio vitae itaque! Lorem ipsum dolor sit
						amet consectetur adipisicing elit. Beatae tenetur fugit officiis
						quaerat voluptatem animi nemo vel in esse recusandae qui, libero
						voluptas facere ducimus, doloribus alias voluptate debitis
						aspernatur quos est fugiat nam similique delectus? Esse non labore
						rem aperiam deleniti nam quibusdam numquam sit magni sint, hic
						repudiandae animi placeat ut ea odio blanditiis quam accusantium
						culpa sed ipsam iste saepe! Dolorem vero culpa quod maxime, tempore
						error vel fugit nihil minus nemo asperiores repudiandae non, odio
						optio minima fuga. Consectetur eius nulla perspiciatis architecto
						iusto debitis cum deleniti voluptates! Reiciendis nemo laborum iure
						nesciunt aspernatur, earum sapiente accusamus, eius libero quam nam,{" "}
						<br />
						<br />
						molestiae repudiandae maiores corrupti. In voluptatibus eius
						architecto libero dolor accusamus illum quaerat delectus esse
						incidunt distinctio eveniet, sit numquam fuga assumenda natus. Unde
						omnis deleniti natus corrupti assumenda veritatis quo, iusto, optio,
						eligendi laborum repellat accusantium architecto facilis cumque quia
						numquam! Quisquam hic voluptates excepturi quaerat deserunt, eum
						consequatur ut impedit provident deleniti cumque dolor similique
						voluptas iure dolores aperiam, voluptatum quia asperiores temporibus
						laborum necessitatibus? Odit temporibus fugiat, optio nisi officiis
						nostrum amet eveniet impedit, vero voluptate dolorum! Rem cum,
						maxime delectus ea provident asperiores, ab praesentium tempore
						cumque natus placeat! Aliquam, vel?
					</p>
				</div>
				<div className="col-span-12 md:col-span-3">
					<Sidebar />
				</div>
			</div>
		</div>
	);
};

export default Home1;
