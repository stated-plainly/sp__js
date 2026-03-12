import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { CheckCasperValue } from '../../helpers/check_casper_value.js';

export class H128Literal {
	#value;

	constructor(value) {
		if (!CheckCasperValue.is_h128(value)) {
			throw new IllegalArgTypeError('value', 'h128');
		}

		this.#value = value;
	}

	get value() {
		return this.#value;
	}
}
