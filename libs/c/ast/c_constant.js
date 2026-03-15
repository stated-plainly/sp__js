import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class CConstant {
	#value;

	constructor(value) {
		if (!Number.isInteger(value)) {
			throw new IllegalArgTypeError('value', 'Int');
		}

		this.#value = value;
	}

	get value() {
		return this.#value;
	}

	type_info(tabs = 0, indent_first_line = true) {
		let root_tab_indents = '';

		for (let i = 0; i < tabs; i++) {
			root_tab_indents += '\t';
		}

		return `${indent_first_line ? root_tab_indents : ''}C<Constant>(${this.value})`;
	}
}
