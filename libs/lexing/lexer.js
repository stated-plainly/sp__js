import { LexemeType } from './lexeme_type.js';
import { Token } from './token';

export class Lexer {
	#lexemes;
	#tokens;

	constructor() {
		this.#lexemes = [];
		this.#tokens = [];
	}

	add_value_lexeme(name, value) {
		if (!(typeof name === 'string')) {
			throw new Error(`Illegal 'name' value provided. Must be a string`);
		}

		if (!(typeof value === 'string')) {
			throw new Error(`Illegal 'value' value provided. Must be a string`);
		}

		this.#lexemes.push({type: LexemeType.__value, name: name, value: value});

		return this;
	}

	add_pattern_lexeme(name, pattern) {
		if (!(typeof name === 'string')) {
			throw new Error(`Illegal 'name' value provided. Must be a string`);
		}

		if (!(pattern instanceof RegExp)) {
			throw new Error(`Illegal 'pattern' value provided. Must be a RegExp.`);
		}

		this.#lexemes.push({type: LexemeType.__pattern, name: name, pattern: pattern});
		
		return this;
	}

	tokenise(source_code) {
		this.#tokens = [];

		if (!(typeof source_code === 'string')) {
			throw new Error(`Illegal 'source_code' value provided. Must be a string.`);
		}

		for (let i = 0; i < source_code.length; i++) {
			const source_code_part = source_code.slice(i);

			let token = null;

			for (const lexeme of this.#lexemes) {
				switch (lexeme.type) {
					case LexemeType.__value:
						if (!(source_code_part.startsWith(lexeme.value))) {
							continue;
						}

						token = new Token(lexeme.name, lexeme.value);

						break;
					case LexemeType.__pattern:
						if (!(lexeme.pattern.test(source_code_part))) {
							continue;
						}

						token = new Token(lexeme.name, source_code_part.match(lexeme.pattern)[0]);

						break;
				}

				if (!(token === null)) {
					break;
				}
			}

			if (token === null) {
				token = new Token('--unknown--', source_code[i]);
			}

			i += token.value.length - 1;

			this.#tokens.push(token);
		}

		return this.#tokens;
	}
}
