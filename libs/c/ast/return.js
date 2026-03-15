import { Constant } from './constant.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class Return {
	#exp;

	constructor(exp) {
		if (!(exp instanceof Constant)) {
			throw new IllegalArgTypeError('exp', 'Constant');
		}

		this.#exp = exp;
	}

	get exp() {
		return this.#exp;
	}
	
	type_info(tabs = 0, indent_first_line = true) {
		let root_tab_indents = '';

		for (let i = 0; i < tabs; i++) {
			root_tab_indents += '\t';
		}

		let type_info = `${indent_first_line ? root_tab_indents : ''}Return(\n`;
		type_info += `${root_tab_indents}\t${this.exp.type_info(tabs + 1, false)}\n`;
		type_info += `${root_tab_indents})`;

		return type_info;
	}
}
