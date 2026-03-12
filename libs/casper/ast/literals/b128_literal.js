import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { CheckCasperValue } from '../../helpers/check_casper_value.js';

export class B128Literal {
	#value;

	constructor(value) {
		if (!CheckCasperValue.is_b128(value)) {
			throw new IllegalArgTypeError('value', 'b128');
		}

		this.#value = value;
	}

	get value() {
		return this.#value;
	}
}
