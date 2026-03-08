// libs
import { ANSI_Palette } from '../graphics/ansi/ansi_palette.js';
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error';
import { IncorrectLogicalAssumptionError } from '../errors/incorrect_logical_assumption_error.js';

export class Letter {
	static __c = Symbol();
	static __d = Symbol();
	static __e = Symbol();
	static __f = Symbol();
	static __g = Symbol();
	static __a = Symbol();
	static __b = Symbol();

	static random() {
		const i = Math.floor(Math.random() * 7);

		switch (i) {
			case 0:
				return Letter.__c;
			case 1:
				return Letter.__d;
			case 2:
				return Letter.__e;
			case 3:
				return Letter.__f;
			case 4:
				return Letter.__g;
			case 5:
				return Letter.__a;
			case 6:
				return Letter.__b;
			default:
				throw new IncorrectLogicalAssumptionError(`${ANSI_Palette.noun.apply_to('i')} generation logic on ${ANSI_Palette.focal_point.apply_to('line 16')} is incorrect. ${ANSI_Palette.noun.apply_to('i')} should be in the range of ${ANSI_Palette.focal_point.apply_to('0..6')}.`);
		}
	}

	static is(letter) {
		switch (letter) {
			case Letter.__c:
			case Letter.__d:
			case Letter.__e:
			case Letter.__f:
			case Letter.__g:
			case Letter.__a:
			case Letter.__b:
				return true;
			default:
				return false;
		}
	}

	static display_name(letter) {
		if (!Letter.is(letter)) {
			throw new IllegalArgTypeError('letter', 'Letter');
		}

		switch (letter) {
			case Letter.__c:
				return 'C';
			case Letter.__d:
				return 'D';
			case Letter.__e:
				return 'E';
			case Letter.__f:
				return 'F';
			case Letter.__g:
				return 'G';
			case Letter.__a:
				return 'A';
			case Letter.__b:
				return 'B';
		}
	}

	static keyboard_friendly_name(letter) {
		if (!Letter.is(letter)) {
			throw new IllegalArgTypeError('letter', 'Letter');
		}

		switch (letter) {
			case Letter.__c:
				return 'c';
			case Letter.__d:
				return 'd';
			case Letter.__e:
				return 'e';
			case Letter.__f:
				return 'f';
			case Letter.__g:
				return 'g';
			case Letter.__a:
				return 'a';
			case Letter.__b:
				return 'b';
		}
	}
}
