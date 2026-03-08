// libs
import { ANSI_Palette } from '../../../../libs/graphics/ansi/ansi_palette.js';
import { IncorrectLogicalAssumptionError } from '../../../../libs/errors/incorrect_logical_assumption_error.js';

export class Perspective {
	static __root_of = Symbol();
	static __scale_degree_of = Symbol();

	static random() {
		const i = Math.floor(Math.random() * 2);

		switch (i) {
			case 0:
				return Perspective.__root_of;
			case 1:
				return Perspective.__scale_degree_of;
			default:
				throw new IncorrectLogicalAssumptionError(`${ANSI_Palette.noun.apply_to('i')} generation logic on ${ANSI_Palette.focal_point.apply_to('line 10')} is incorrect. ${ANSI_Palette.noun.apply_to('i')} should be in the range of ${ANSI_Palette.focal_point.apply_to('0..2')}.`);
		}
	}
}
