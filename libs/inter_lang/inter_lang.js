// libs
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error.js';
import { inter_lang_lexer } from './inter_lang_lexer.js';
import { InterLangParser } from './inter_lang_parser.js';

export class InterLang {
	static #lexer = inter_lang_lexer;
	static #parser = new InterLangParser();

	static parse(il_text) {
		if (!(typeof il_text === 'string')) {
			throw new IllegalArgTypeError('il_text', 'String');
		}

		return InterLang.#parser.parse(InterLang.#lexer.tokenise(il_text));
	}
}
