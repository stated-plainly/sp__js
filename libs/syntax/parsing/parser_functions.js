import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';
import { IncorrectLogicalAssumptionError } from '../../errors/incorrect_logical_assumption_error.js';
import { Token } from '../lexing/token.js';
import { UserError } from '../../errors/user_error.js';

export class ParserFunctions {
	static expect(tokens, token_name, token_value = null, line_index = null, char_index = null) {
		if (!(Array.isArray(tokens) && tokens.every(t => t instanceof Token))) {
			throw new IllegalArgTypeError('tokens', 'Array<Token>');
		}
		
		if (!(typeof token_name === 'string')) {
			throw new IllegalArgTypeError('token_name', 'String');
		}

		if (!(typeof token_value === 'string' || token_value === null)) {
			throw new IllegalArgTypeError('token_value', 'String | null');
		}

		if (!(Number.isInteger(line_index) || line_index === null)) {
			throw new IllegalArgTypeError('line_index', 'Int | null');
		}

		if (!(Number.isInteger(char_index) || char_index === null)) {
			throw new IllegalArgTypeError('char_index', 'Int | null');
		}

		const actual_token = ParserFunctions.#take_token(tokens);

		if (actual_token === false) {
			throw new IncorrectLogicalAssumptionError(`ParserFunctions.expect method called on an empty list of tokens.`);
		}

		const expected_token = (token_value === null) ? new Token(token_name, '--ignored--') : new Token(token_name, token_value);
		const is_match = (token_value === null) ? actual_token.has_same_name(expected_token) : actual_token.has_same_data(expected_token);

		if (!is_match) {
			if (line_index === null || char_index === null) {
				throw new UserError(`Parse Error :: Expected ${expected_token.type_info}, encountered ${actual_token.type_info}.`);
			} else {
				throw new UserError(`Parse Error @[line: ${line_index} | char: ${char_index}] :: Expected ${expected_token.type_info}, encountered ${actual_token.type_info}.`);
			}
		}

		return actual_token;
	}

	static #take_token(tokens) {
		if (!(Array.isArray(tokens) && tokens.every(t => t instanceof Token))) {
			throw new IllegalArgTypeError('tokens', 'Array<Token>');
		}

		return (tokens.length > 0) ? tokens.pop() : false;
	}
}
