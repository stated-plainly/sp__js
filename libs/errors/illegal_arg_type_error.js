// libs
import { ANSI_Palette } from '../graphics/ansi/ansi_palette.js';

export class IllegalArgTypeError extends Error {
	constructor(arg_name, expected_type, ...args) {
		super(`${ANSI_Palette.focal_point.apply_to('Illegal Arg Type')} Error ${ANSI_Palette.ancillary.apply_to('::')} Illegal ${ANSI_Palette.verb.apply_to(arg_name)} value provided. Must be of type ${ANSI_Palette.focal_point.apply_to(expected_type)}`, ...args);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, IllegalArgTypeError);
		}
	}
}
