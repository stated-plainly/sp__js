import { Lexer } from '../../syntax/lexing/lexer.js';

export const c_lexer = new Lexer()
	.add_pattern_lexeme('keyword :: int', /^int\b/)
	.add_pattern_lexeme('keyword :: void', /^void\b/)
	.add_pattern_lexeme('keyword :: return', /^return\b/)
	.add_value_lexeme('paren :: open', '(')
	.add_value_lexeme('paren :: close', ')')
	.add_value_lexeme('curly :: open', '{')
	.add_value_lexeme('curly :: close', '}')
	.add_value_lexeme('semi-colon', ';')
	.add_pattern_lexeme('identifier', /^[a-zA-Z_]\w*\b/)
	.add_pattern_lexeme('constant', /^[0-9]+\b/);
