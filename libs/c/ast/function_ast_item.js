import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';
import { ReturnASTItem } from './return_ast_item.js';

export class FunctionASTItem {
	#name;
	#body

	constructor(name, body) {
		if (!(typeof name === 'string')) {
			throw new IllegalArgTypeError('name', 'String');
		}

		if (!(body instanceof ReturnASTItem)) {
			throw new IllegalArgTypeError('body', 'ASTItem<Return>');
		}

		this.#name = name;
		this.#body = body;
	}

	get name() {
		return this.#name;
	}

	get body() {
		return this.#body;
	}

	type_info(tabs = 0, indent_first_line = true) {
		let root_tab_indents = '';

		for (let i = 0; i < tabs; i++) {
			root_tab_indents += '\t';
		}

		let type_info = `${indent_first_line ? root_tab_indents : ''}ASTItem<Function>(\n`;
		type_info += `${root_tab_indents}\tname: "${this.name}"\n`;
		type_info += `${root_tab_indents}\tbody: ${this.body.type_info(tabs + 1, false)}\n`;
		type_info += `${root_tab_indents})`;

		return type_info;
	}
}
