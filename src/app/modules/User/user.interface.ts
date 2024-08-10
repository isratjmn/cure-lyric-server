import { Model } from "mongoose";

import { USER_ROLE } from "./user.constant";

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	photo: string;
	role: "user" | "admin" | "superAdmin";
	isEmailVerified: boolean;
	comparePassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser> {
	isUserExistsByCustomID(id: string): Promise<IUser>;

	isPasswordMatched(
		plainTextPass: string,
		hashedPass: string
	): Promise<boolean>;
	isJWTIssuedBeforePasswordChanged(
		passwordChangedTimestamp: Date,
		jwtIssuedTimestamp: number
	): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
