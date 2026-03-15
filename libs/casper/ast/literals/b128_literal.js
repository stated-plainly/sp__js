import { CharParser } from '../../../text/char_parser.js';
import { CheckType } from '../../../types/check_type.js';
import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { PrimitiveID } from '../../helpers/primitive_id.js';

export class B128Literal {
	static #type_id = PrimitiveID.__b128;

	#id;
	#value;

	constructor(value) {
		if (!(CheckType.is_string(value))) {
			throw new IllegalArgTypeError('value', 'String');
		}

		const char_parser = new CharParser()
			.load(value)
			.chainable_expect(true);

		for (let i = 0; i < 16; i++) {
			if (i > 0) {
				char_parser.expect('_').expect('_');
			}

			for (let j = 0; j < 9; j++) {
				(j == 4) ? char_parser.expect('_') : char_parser.expect(CharParser.__binary); 
			}
		}

		char_parser.expect(CharParser.__end);

		this.#id = Symbol();
		this.#value = value;
	}

	get type_id() {
		return B128Literal.#type_id;
	}

	get id() {
		return this.#id;
	}

	get value() {
		return this.#value;
	}
}
