"use client";
import Form from "next/form";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/components/context";
import SubmitButton from "@/lib/components/SubmitButton";
import { contactAction } from "./action";

const ContactPage = () => {
	const { userInfo } = useAuth();
	const clientAction = async (formData) => {
		const data = await contactAction(formData);
		if (data?.success) {
			// Swal.fire("Success", data?.message, "success");
			toast.success(data?.message);
		} else {
			// Swal.fire("Error", data?.message, "error");
			toast.error(data?.message);
		}
	};
	return (
		<div className="grid md:grid-cols-12 px-2">
			<div className="md:col-span-8">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29121.148379820253!2d89.94527639518854!3d24.16669797381342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdff2abd1b73ef%3A0xb23a8679a8046ffa!2sCharpara%20Bazar!5e0!3m2!1sen!2sbd!4v1771823330782!5m2!1sen!2sbd"
					width={"100%"}
					height={450}
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>
			<div className="md:col-span-4">
				<div className="px-4">
					<div className=" flex justify-center">
						<div>
							<h2>Address</h2>
							<p>Charpara Bazar</p>
							<p>Delduar, Tangail</p>
							<p>Mobile: +8801778471190</p>
							<p>email:</p>
							<p>Website:</p>
						</div>
					</div>
					<hr />
					<h2 className=" text-center">Contact us</h2>
					<div className=" flex justify-center">
						<Form action={clientAction}>
							<input
								className=" mb-3 input"
								type="text"
								name="name"
								defaultValue={userInfo?.name}
								placeholder="Name"
								required
							/>
							<input
								className=" mb-3 input"
								type="email"
								name="email"
								defaultValue={userInfo?.email}
								placeholder="email"
								required
							/>
							<textarea
								className=" mb-3 input"
								rows="4"
								type="text"
								name="message"
								placeholder="Type your message"
								required
							></textarea>
							<div className="mt-3">
								<SubmitButton title={"Submit"} design={"btn-accent w-full"} />
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
