import { CheckType } from '../../types/check_type.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class VariableAccessModifier {
	#id;
	#name;

	constructor(id, name) {
		if (!CheckType.is_symbol(id)) {
			throw new IllegalArgTypeError('id', 'Symbol');
		}

		if (!CheckType.is_string(name)) {
			throw new IllegalArgTypeError('name', 'String');
		}

		this.#id = id;
		this.#name = name;
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}
}
