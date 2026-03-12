import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error.js';
import { CheckCasperValue } from '../../helpers/check_casper_value.js';

export class U64Literal {
	#value;

	constructor(value) {
		if (!CheckCasperValue.is_u64(value)) {
			throw new IllegalArgTypeError('value', 'u64');
		}

		this.#value = value;
	}

	get value() {
		return this.#value;
	}
}
