import { CharParser } from '../../../text/char_parser.js';
import { CheckType } from '../../../types/check_type.js';
import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { PrimitiveID } from '../../helpers/primitive_id.js';

export class H16Literal {
	static #type_id = PrimitiveID.__h16;

	#id;
	#value;

	constructor(value) {
		if (!(CheckType.is_string(value))) {
			throw new IllegalArgTypeError('value', 'String');
		}

		new CharParser()
			.load(value)
			.chainable_expect(true)
			.expect(CharParser.__hex)
			.expect(CharParser.__hex)
			.expect(CharParser.__end);

		this.#id = Symbol();
		this.#value = value;
	}

	get type_id() {
		return H16Literal.#type_id;
	}

	get id() {
		return this.#id;
	}

	get value() {
		return this.#value;
	}
}
