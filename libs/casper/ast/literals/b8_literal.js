import { CharParser } from '../../../text/char_parser.js';
import { CheckType } from '../../../types/check_type.js';
import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { PrimitiveID } from '../../helpers/primitive_id.js';

export class B8Literal {
	static #type_id = PrimitiveID.__b8;

	#id;
	#value;

	constructor(value) {
		if (!(CheckType.is_string(value))) {
			throw new IllegalArgTypeError('value', 'String');
		}

		const char_parser = new CharParser()
			.load(value)
			.chainable_expect(true);

		for (let i = 0; i < 9; i++) {
			(i == 4) ? char_parser.expect('_') : char_parser.expect(CharParser.__binary); 
		}

		char_parser.expect(CharParser.__end);

		this.#id = Symbol();
		this.#value = value;
	}

	get type_id() {
		return B8Literal.#type_id;
	}

	get id() {
		return this.#id;
	}

	get value() {
		return this.#value;
	}
}
