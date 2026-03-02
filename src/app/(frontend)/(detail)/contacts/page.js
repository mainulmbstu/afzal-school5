import { Suspense } from "react";
import ContactPage from "./ContactPage";
import MessagePage from "./MessagePage";

export const metadata = {
	title: "Contact",
	description: "Contact page",
};

const Contacts = async ({ searchParams }) => {
	return (
		<div className="">
			<Suspense fallback="sending">
				<ContactPage />
			</Suspense>

			<Suspense fallback=<h3>Loading message</h3>>
				<MessagePage searchParams={searchParams} />
			</Suspense>
		</div>
	);
};

export default Contacts;
