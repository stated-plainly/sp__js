import { CConstant } from './c_constant.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class CReturn {
	#expression;

	constructor(expression) {
		if (!(expression instanceof CConstant)) {
			throw new IllegalArgTypeError('exp', 'C<Constant>');
		}

		this.#expression = expression;
	}

	get exp() {
		return this.#expression;
	}
	
	type_info(tabs = 0, indent_first_line = true) {
		let root_tab_indents = '';

		for (let i = 0; i < tabs; i++) {
			root_tab_indents += '\t';
		}

		let type_info = `${indent_first_line ? root_tab_indents : ''}C<Return>(\n`;
		type_info += `${root_tab_indents}\t${this.exp.type_info(tabs + 1, false)}\n`;
		type_info += `${root_tab_indents})`;

		return type_info;
	}
}
