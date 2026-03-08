export class UserError extends Error {
	constructor(error_message, ...args) {
		super(error_message, ...args);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, UserError);
		}
	}
}
