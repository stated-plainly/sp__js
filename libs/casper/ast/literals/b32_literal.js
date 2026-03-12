import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { CheckCasperValue } from '../../helpers/check_casper_value.js';

export class B32Literal {
	#value;

	constructor(value) {
		if (!CheckCasperValue.is_b32(value)) {
			throw new IllegalArgTypeError('value', 'b32');
		}

		this.#value = value;
	}

	get value() {
		return this.#value;
	}
}
