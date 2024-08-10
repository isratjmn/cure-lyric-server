import jwt from "jsonwebtoken";

export const generateToken = (id: string, expiresIn = "1h"): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn });
};
