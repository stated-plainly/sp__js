import { ConstantASTItem } from '../ast/constant_ast_item.js';
import { FunctionASTItem } from '../ast/function_ast_item.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';
import { ParserFunctions } from '../../syntax/parsing/parser_functions.js';
import { ProgramASTItem } from '../ast/program_ast_item.js';
import { ReturnASTItem } from '../ast/return_ast_item.js';
import { Token } from '../../syntax/lexing/token.js';

export class Parser {
	static parse(tokens) {
		if (!(Array.isArray(tokens) && tokens.every(t => t instanceof Token))) {
			throw new IllegalArgTypeError('tokens', 'Array<Token>');
		}

		tokens.reverse();

		return Parser.#parse_program(tokens);
	}

	static #parse_program(tokens) {
		const function_definition = Parser.#parse_function(tokens);
		return new ProgramASTItem(function_definition);
	}

	static #parse_function(tokens) {
		ParserFunctions.expect(tokens, 'keyword :: int');
		const name = ParserFunctions.expect(tokens, 'identifier', 'main').value;
		ParserFunctions.expect(tokens, 'paren :: open');
		ParserFunctions.expect(tokens, 'keyword :: void');
		ParserFunctions.expect(tokens, 'paren :: close');
		ParserFunctions.expect(tokens, 'curly :: open');
		const body = Parser.#parse_statement(tokens);
		return new FunctionASTItem(name, body);
	}

	static #parse_statement(tokens) {
		ParserFunctions.expect(tokens, 'keyword :: return');
		const return_val = Parser.#parse_exp(tokens);
		ParserFunctions.expect(tokens, 'semi-colon');
		return new ReturnASTItem(return_val);
	}

	static #parse_exp(tokens) {
		const token = ParserFunctions.expect(tokens, 'constant');
		return new ConstantASTItem(parseInt(token.value));
	}
}
