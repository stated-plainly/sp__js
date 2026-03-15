import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class Constant {
	#value;

	constructor(int) {
		if (!Number.isInteger(int)) {
			throw new IllegalArgTypeError('int', 'Int');
		}

		this.#value = int;
	}

	get int() {
		return this.#value;
	}

	get type_info() {
		return `Constant(${this.int})`;
	}

	type_info(tabs = 0, indent_first_line = true) {
		let root_tab_indents = '';

		for (let i = 0; i < tabs; i++) {
			root_tab_indents += '\t';
		}

		return `${indent_first_line ? root_tab_indents : ''}Constant(${this.int})`;
	}
}
