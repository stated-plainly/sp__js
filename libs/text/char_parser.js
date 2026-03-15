import { CheckType } from '../types/check_type.js';
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error.js';
import { UserError } from '../errors/user_error.js';

export class CharParser {
	static __lowercase = Symbol();
	static __uppercase = Symbol();
	static __binary = Symbol();
	static __decimal = Symbol();
	static __hex = Symbol();
	static __end = Symbol();

	static #specials_as_list() {
		return [
			CharParser.__lowercase,
			CharParser.__uppercase,
			CharParser.__binary,
			CharParser.__decimal,
			CharParser.__hex,
			CharParser.__end,
		];
	}

	static #special_as_string(special) {
		if (!(CheckType.is_symbol(special) && CheckType.list_has_item(CharParser.#specials_as_list(), special))) {
			throw new IllegalArgTypeError('special', 'Special');
		}

		switch (special) {
			case CharParser.__lowercase:
				return 'Special<Lowercase>';
			case CharParser.__uppercase:
				return 'Special<Uppercase>';
			case CharParser.__binary:
				return 'Special<Binary>';
			case CharParser.__decimal:
				return 'Special<Decimal>';
			case CharParser.__hex:
				return 'Special<Hex>';
			case CharParser.__end:
				return 'Special<End>';
		}
	}

	static #lowercase_letters = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	];

	static #uppercase_letters = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	];

	static #binary_digits = [
		'0',
		'1',
	];

	static #decimal_digits = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
	];

	static #hex_digits = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
	];

	#char_list;

	constructor() {
		this.#char_list = [];
	}

	load(string) {
		this.#char_list = string.reverse();
	}

	expect(char_or_special) {
		if (!(CheckType.is_string(char_or_special) || (CheckType.is_symbol(char_or_special) && CheckType.list_has_item(CharParser.#specials_as_list(), char_or_special)))) {
			throw new IllegalArgTypeError('char_or_special', 'Char | Special');
		}

		let char;

		if (CheckType.is_string(char_or_special)) {
			if (this.#char_list.length === 0) {
				throw new UserError(`Expected: "${char_or_special}", Found: "${CharParser.#special_as_string(CharParser.__end)}"`);
			}

			char = this.#char_list.pop();

			if (!(char === char_or_special)) {
				throw new UserError(`Expected "${char_or_special}", Found: "${char}"`);
			}
		} else {
			if (this.#char_list.length === 0) {
				if (char_or_special === CharParser.__end) {
					return false;
				} else {
					throw new UserError(`Expected "${char_or_special}", Found: "${CharParser.__end}"`);
				}
			}

			char = this.#char_list.pop();

			switch (char_or_special) {
				case CharParser.__lowercase:
					if (!(CharParser.list_has_item(CharParser.#lowercase_letters, char))) {
						throw new UserError(`Expected "${char_or_special}", Found: "${char}"`);
					}

					break;
				case CharParser.__uppercase:
					if (!(CharParser.list_has_item(CharParser.#uppercase_letters, char))) {
						throw new UserError(`Expected "${char_or_special}", Found: "${char}"`);
					}
					
					break;
				case CharParser.__binary:
					if (!(CharParser.list_has_item(CharParser.#binary_digits, char))) {
						throw new UserError(`Expected "${char_or_special}", Found: "${char}"`);
					}
					
					break;
				case CharParser.__decimal:
					if (!(CharParser.list_has_item(CharParser.#decimal_digits, char))) {
						throw new UserError(`Expected "${char_or_special}", Found: "${char}"`);
					}
					
					break;
				case CharParser.__hex:
					if (!(CharParser.list_has_item(CharParser.#hex_digits, char))) {
						throw new UserError(`Expected "${char_or_special}", Found: "${char}"`);
					}
					
					break;
			}
		}

		return char;
	}
}
