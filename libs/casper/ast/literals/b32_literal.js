import { CheckType } from '../../../types/check_type.js';
import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { PrimitiveID } from '../../helpers/primitive_id.js';

export class B32Literal {
	static #type_id = PrimitiveID.__b32;
	static #value_checker_regex = /^[01]{4}_[01]{4}__[01]{4}_[01]{4}__[01]{4}_[01]{4}__[01]{4}_[01]{4}$/;

	#value;

	constructor(value) {
		if (!(CheckType.is_string(value) && B32Literal.#value_checker_regex.test(value))) {
			throw new IllegalArgTypeError('value', 'String<b32 :: 0000_0000__0000_0000__0000_0000__0000_0000 to 1111_1111__1111_1111__1111_1111__1111_1111>');
		}

		this.#value = value;
	}

	get type_id() {
		return B32Literal.#type_id;
	}

	get value() {
		return this.#value;
	}
}
