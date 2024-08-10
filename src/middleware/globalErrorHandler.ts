import { ZodError } from "zod";
import express, { ErrorRequestHandler } from "express";

import config from "../app/config";

import AppError from "../app/errors/AppError";
import handleDuplicateError from "../app/errors/HandleDuplicateError";
import handleCastError from "../app/errors/HandleCastError";
import handlevalidationError from "../app/errors/HandleValidationError";
import handleZodError from "../app/errors/HandleZodError";
import { TErrorSources } from "../app/interface/error";

export const globalErrorHandler: ErrorRequestHandler = (
	err,
	req,
	res,
	next
) => {
	let statusCode = 500;
	let message = "Something Went Wrong";
	let errorSources: TErrorSources = [
		{
			path: "",
			message: "Something Went Wrong",
		},
	];

	if (err instanceof ZodError) {
		const simplifiedError = handleZodError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorSources = simplifiedError?.errorSources;
	} else if (err?.name === "ValidationError") {
		const simplifiedError = handlevalidationError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorSources = simplifiedError?.errorSources;
	} else if (err?.name === "CastError") {
		const simplifiedError = handleCastError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorSources = simplifiedError?.errorSources;
	} else if (err?.code === 11000) {
		const simplifiedError = handleDuplicateError(err);
		statusCode = simplifiedError?.statusCode;
		message = simplifiedError?.message;
		errorSources = simplifiedError?.errorSources;
	} else if (err instanceof AppError) {
		statusCode = err?.statusCode;
		message = err?.message;
		errorSources = [
			{
				path: "",
				message: err?.message,
			},
		];
	} else if (err instanceof Error) {
		message = err?.message;
		errorSources = [
			{
				path: "",
				message: err?.message,
			},
		];
	}

	// Utlimate Return
	return res.status(statusCode).json({
		success: false,
		message,
		errorSources,
		err,
		stack: config.NODE_ENV === "development" ? err?.stack : null,
	});
};
