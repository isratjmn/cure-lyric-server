import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string, p0: string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com.",
		port: 587,
		secure: config.NODE_ENV === "production",
		auth: {
			user: "mnmnisrat@gmail.com",
			pass: "upjj lwfc hqqt psky",
		},
	});

	await transporter.sendMail({
		from: "mnmnisrat@gmail.com",
		to,
		subject: "Reset  Your Password within 10mins",
		text: "",
		html,
	});
};
