import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';
import { ParserFunctions } from '../../syntax/parsing/parser_functions.js';
import { CProgram } from '../ast/c_program.js';
import { Token } from '../../syntax/lexing/token.js';

import { CConstant } from '../ast/c_constant.js';
import { CFunctionDefinition } from '../ast/c_function_definition.js';
import { CReturn } from '../ast/c_return.js';

export class CParser {
	static parse(tokens) {
		if (!(Array.isArray(tokens) && tokens.every(t => t instanceof Token))) {
			throw new IllegalArgTypeError('tokens', 'Array<Token>');
		}

		tokens.reverse();

		return CParser.#parse_program(tokens);
	}

	static #parse_program(tokens) {
		const function_definition = CParser.#parse_function(tokens);
		return new CProgram(function_definition);
	}

	static #parse_function(tokens) {
		ParserFunctions.expect(tokens, 'keyword :: int');
		const name = ParserFunctions.expect(tokens, 'identifier', 'main').value;
		ParserFunctions.expect(tokens, 'paren :: open');
		ParserFunctions.expect(tokens, 'keyword :: void');
		ParserFunctions.expect(tokens, 'paren :: close');
		ParserFunctions.expect(tokens, 'curly :: open');
		const body = CParser.#parse_statement(tokens);
		return new CFunctionDefinition(name, body);
	}

	static #parse_statement(tokens) {
		ParserFunctions.expect(tokens, 'keyword :: return');
		const return_val = CParser.#parse_exp(tokens);
		ParserFunctions.expect(tokens, 'semi-colon');
		return new CReturn(return_val);
	}

	static #parse_exp(tokens) {
		const token = ParserFunctions.expect(tokens, 'constant');
		return new CConstant(parseInt(token.value));
	}
}
