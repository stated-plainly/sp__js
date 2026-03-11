// libs
import { Lexer } from '../syntax/lexing/lexer.js';

export const inter_lang_lexer = new Lexer()
	.add_pattern_lexeme('letter :: lower', /^[a-z]/)
	.add_pattern_lexeme('number', /^[0-9]/)
	.add_pattern_lexeme('newline', /^\r?\n/)
	.add_value_lexeme('tab', '\t')
	.add_value_lexeme('whitespace', ' ')
	.add_value_lexeme('colon', ':')
	.add_value_lexeme('underscore', '_')
	.add_value_lexeme('paren :: open', '(')
	.add_value_lexeme('paren :: close', ')')
	.add_value_lexeme('square :: open', '[')
	.add_value_lexeme('square :: close', ']')
	.add_value_lexeme('curly :: open', '{')
	.add_value_lexeme('curly :: close', '}');
