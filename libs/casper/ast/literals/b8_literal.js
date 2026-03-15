import { CharParser } from '../../../text/char_parser.js';
import { CheckType } from '../../../types/check_type.js';
import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { PrimitiveID } from '../../helpers/primitive_id.js';

export class B8Literal {
	static #type_id = PrimitiveID.__b8;

	#value;

	constructor(value) {
		if (!(CheckType.is_string(value))) {
			throw new IllegalArgTypeError('value', 'String');
		}

		new CharParser()
			.load(value)
			.chainable_expect(true)
			.expect(CharParser.__binary).expect(CharParser.__binary).expect(CharParser.__binary).expect(CharParser.__binary)
			.expect('_')
			.expect(CharParser.__binary).expect(CharParser.__binary).expect(CharParser.__binary).expect(CharParser.__binary)
			.expect(CharParser.__end);

		this.#value = value;
	}

	get type_id() {
		return B8Literal.#type_id;
	}

	get value() {
		return this.#value;
	}
}
