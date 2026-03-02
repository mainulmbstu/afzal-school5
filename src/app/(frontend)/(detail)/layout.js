import Sidebar from "@/lib/components/Sidebar";

export const metadata = {
	title: {
		default: "Admin",
		template: "%s | AFZAL SCHOOL",
		// absolute:""
	},
	description: "A school website",
};
export default function AdminLayout({ children }) {
	return (
		<div className=" grid md:grid-cols-12 gap-2 px-2">
			<div className="col-span-12 md:col-span-9 md:px-3">{children}</div>
			<div className="col-span-12 md:col-span-3 card">
				<Sidebar />
			</div>
		</div>
	);
}
