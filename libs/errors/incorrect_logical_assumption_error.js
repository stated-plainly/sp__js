// libs
import { ANSI_Palette } from '../graphics/ansi/ansi_palette.js';

export class IncorrectLogicalAssumptionError extends Error {
	constructor(incorrect_logical_assumption, ...args) {
		super(`${ANSI_Palette.focal_point.apply_to('Incorrect Logical Assumption')} Error ${ANSI_Palette.ancillary.apply_to('::')} ${incorrect_logical_assumption}`, ...args);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, IncorrectLogicalAssumptionError);
		}
	}
}
