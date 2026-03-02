import { Suspense } from "react";
import Home1 from "@/lib/components/homePage/Home1";

// export const metadata = {
//   title: "HOME",
//   description: "HOME PAGE",
// };

const Home = async () => {
	return (
		<div>
			<Suspense fallback="Loading">
				<Home1 />
			</Suspense>
		</div>
	);
};

export default Home;
