import { Request, Response } from "express";

import { UserM } from "../User/user.model";
import { generateToken } from "../../utils/GenerateToken";
import { sendEmail } from "../../utils/sendEmail";

export const register = async (req: Request, res: Response) => {
	const { name, email, password, photo } = req.body;
	try {
		const user = await UserM.create({ name, email, password, photo });
		const token = generateToken(user?.id);
		// Send verification email
		const verificationCode = Math.floor(100000 + Math.random() * 900000);
		await sendEmail(
			email,
			"Verify your email",
			`Your code: ${verificationCode}`
		);
		res.status(201).json({
			token,
			message: "User registered. Verify your email.",
		});
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};


export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await UserM.findOne({ email });
		if (!user || !(await user.comparePassword(password))) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const accessToken = generateToken(user?.id);
		const refreshToken = generateToken(user.id, "1d");
		res.json({ accessToken, refreshToken });
	} catch (error: any) {
		res.status(400).json({ error: error.message });
	}
};
