import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { CheckCasperValue } from '../../helpers/check_casper_value.js';

export class U16Literal {
	#value;

	constructor(value) {
		if (!CheckCasperValue.is_u16(value)) {
			throw new IllegalArgTypeError('value', 'u16');
		}

		this.#value = value;
	}

	get value() {
		return this.#value;
	}
}
