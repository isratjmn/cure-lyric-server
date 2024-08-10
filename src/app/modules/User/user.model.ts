import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "./user.interface";
import config from "../../config";


const UserSchema: Schema<IUser, UserModel> = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "admin", "superAdmin"],
			default: "user",
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {
	const user = this;
	// Hashing Password and save this to th database
	user.password = await bcrypt.hash(
		user.password,
		Number(config.bcrypt_salt_rounds)
	);
	next();
});

UserSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

export const UserM = model<IUser, UserModel>("User", UserSchema);
