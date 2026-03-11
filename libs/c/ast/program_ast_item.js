import { FunctionASTItem } from './function_ast_item.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class ProgramASTItem {
	#function_definition;

	constructor(function_definition) {
		if (!(function_definition instanceof FunctionASTItem)) {
			throw new IllegalArgTypeError('function_definition', 'ASTItem<Function>');
		}

		this.#function_definition = function_definition;
	}

	get function_definition() {
		return this.#function_definition;
	}

	type_info(tabs = 0, indent_first_line = true) {
		let root_tab_indents = '';

		for (let i = 0; i < tabs; i++) {
			root_tab_indents += '\t';
		}

		let type_info = `${indent_first_line ? root_tab_indents : ''}ASTItem<Program>(\n`;
		type_info += `${root_tab_indents}\t${this.function_definition.type_info(tabs + 1, false)}\n`;
		type_info += `${root_tab_indents})`;

		return type_info;
	}
}
