import { CFunctionDefinition } from './c_function_definition.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class CProgram {
	#function_definition;

	constructor(function_definition) {
		if (!(function_definition instanceof CFunctionDefinition)) {
			throw new IllegalArgTypeError('function_definition', 'C<FunctionDefinition>');
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

		let type_info = `${indent_first_line ? root_tab_indents : ''}C<Program>(\n`;
		type_info += `${root_tab_indents}\t${this.function_definition.type_info(tabs + 1, false)}\n`;
		type_info += `${root_tab_indents})`;

		return type_info;
	}
}
