import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class ConstantASTItem {
	#int;

	constructor(int) {
		if (!Number.isInteger(int)) {
			throw new IllegalArgTypeError('int', 'Int');
		}

		this.#int = int;
	}

	get int() {
		return this.#int;
	}

	get type_info() {
		return `ASTItem<Constant>(${this.int})`;
	}

	type_info(tabs = 0, indent_first_line = true) {
		let root_tab_indents = '';

		for (let i = 0; i < tabs; i++) {
			root_tab_indents += '\t';
		}

		return `${indent_first_line ? root_tab_indents : ''}ASTItem<Constant>(${this.int})`;
	}
}
