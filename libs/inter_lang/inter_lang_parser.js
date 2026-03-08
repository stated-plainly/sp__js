// libs
import { ANSI_Palette } from '../graphics/ansi/ansi_palette.js';
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error.js';
import { Text } from '../text/text.js';
import { Token } from '../lexing/token.js';
import { UserError } from '../errors/user_error.js';

export class InterLangParser {
	#ast;
	#ast_context_stack;
	#token_index;
	#line_index;
	#char_index;
	#tab_indent_count;

	constructor() {
		this.#reset_fields();
	}

	parse(tokens) {
		this.#reset_fields();

		if (!(Array.isArray(tokens) && tokens.every(token => token instanceof Token))) {
			throw new IllegalArgTypeError('tokens', 'Array<Token>');
		}

		do {
			this.#parse_kvp(tokens);
		} while (!(this.#current_token(tokens) === false));

		const ast = this.#ast;

		this.#reset_fields();

		return ast;
	}

	#parse_kvp(tokens) {
		let current_token = null;

		let key_value = '';
		let value_type = '';

		let last_kvp_part = 'start';

		kvp_loop: while (true) {
			current_token = (current_token === null) ? this.#current_token(tokens) : this.#advance_token(tokens);

			switch (last_kvp_part) {
				case 'start':
					if (this.#tab_indent_count > 0) {
						for (let i = 0; i < this.#tab_indent_count; i++) {
							if (current_token === false) {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('Object')} wrapper indentation level. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
							} else if (!(current_token.name === 'tab')) {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('Object')} wrapper indentation level. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
							}

							if (i < (this.#tab_indent_count - 1)) {
								current_token = this.#advance_token(tokens);
							}
						}
					} else {
						current_token = null;
					}

					last_kvp_part = 'tab-indent-end';
					continue kvp_loop;
				case 'tab-indent-end':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')}, signifying the first character of a key. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`))
					} else if (!(current_token.name === 'letter :: lower')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')}, signifying the first character of a key. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`))
					}

					last_kvp_part = 'key :: letter';
					key_value += current_token.value;
					continue kvp_loop;
				case 'key :: letter':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'letter :: lower' || current_token.name === 'underscore' || current_token.name === 'colon')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					switch (current_token.name) {
						case 'letter :: lower':
							key_value += current_token.value;
							continue kvp_loop;
						case 'underscore':
							last_kvp_part = 'key :: divider';
							key_value += current_token.value;
							continue kvp_loop;
						case 'colon':
							last_kvp_part = 'key :: end';
							continue kvp_loop;
					}
				case 'key :: number':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[0-9]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'number' || current_token.name === 'underscore' || current_token.name === 'colon')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[0-9]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					switch (current_token.name) {
						case 'number':
							key_value += current_token.value;
							continue kvp_loop;
						case 'underscore':
							last_kvp_part = 'key :: divider';
							key_value += current_token.value;
							continue kvp_loop;
						case 'colon':
							last_kvp_part = 'key :: end';
							continue kvp_loop;
					}
				case 'key :: divider':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('[0-9]')} to continue the current key. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'letter :: lower' || current_token.name === 'number')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('[0-9]')} to continue the current key. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					switch (current_token.name) {
						case 'letter :: lower':
							last_kvp_part = 'key :: letter';
							key_value += current_token.value;
							continue kvp_loop;
						case 'number':
							last_kvp_part = 'key :: number';
							key_value += current_token.value;
							continue kvp_loop;
					}
				case 'key :: end':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('" "')} to separate the current KVP. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'whitespace')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('" "')} to separate the current KVP. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					last_kvp_part = 'kvp divider :: end';
					continue kvp_loop;
				case 'kvp divider :: end':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('(')} to signify the start of a ${ANSI_Palette.verb.apply_to('String')} or ${ANSI_Palette.focal_point.apply_to('[')} to signify the start of a ${ANSI_Palette.verb.apply_to('List')} or ${ANSI_Palette.focal_point.apply_to('{')} to signify the start of an ${ANSI_Palette.verb.apply_to('Object')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'paren :: open' || current_token.name === 'square :: open' || current_token.name === 'curly :: open')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('(')} to signify the start of a ${ANSI_Palette.verb.apply_to('String')} or ${ANSI_Palette.focal_point.apply_to('[')} to signify the start of a ${ANSI_Palette.verb.apply_to('List')} or ${ANSI_Palette.focal_point.apply_to('{')} to signify the start of an ${ANSI_Palette.verb.apply_to('Object')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					switch (current_token.name) {
						case 'paren :: open':
							value_type = 'string';
							break kvp_loop;
						case 'square :: open':
							value_type = 'list';
							break kvp_loop;
						case 'curly :: open':
							value_type = 'object';
							break kvp_loop;
					}
			}
		}

		const current_ast_context = this.#current_ast_context();

		if (key_value in current_ast_context.object) {
			throw new UserError(this.#error_message__parse_error(`A key with the name ${ANSI_Palette.focal_point.apply_to(key_value)} already exists in the current ${ANSI_Palette.noun.apply_to('InterLang')} object context.`));
		}

		current_ast_context.object[key_value] = null;

		this.#descend_ast_context({object: current_ast_context.object, key: key_value});

		switch (value_type) {
			case 'string':
				this.#parse_string(tokens);
				break;
			case 'list':
				this.#parse_list(tokens);
				break;
			case 'object':
				this.#parse_object(tokens);
				break;
		}
	}

	#parse_string(tokens) {
		let current_token;

		let string_value = '';

		let last_string_part = 'start';

		string_loop: while (true) {
			current_token = this.#advance_token(tokens);

			switch (last_string_part) {
				case 'start':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))}, to signify the start of a multi-line ${ANSI_Palette.verb.apply_to('String')} or ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))}, to signify the end of the ${ANSI_Palette.verb.apply_to('String')}, or any other character, to signify part of the ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					}
					
					switch (current_token.name) {
						case 'newline':
							last_string_part = 'multi :: line-end';
							this.#tab_indent_count += 1;
							continue string_loop;
						case 'paren :: close':
							last_string_part = 'single :: potential-end';
							continue string_loop;
						default:
							last_string_part = 'single :: body';
							string_value += current_token.value;
							continue string_loop;
					}
				case 'single :: body':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))}, to signify the end of the ${ANSI_Palette.noun.apply_to('String')}, or any character aside from ${ANSI_Palette.bad.apply_to(Text.escape('\n'))}, to signify a continuation of the ${ANSI_Palette.verb.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (current_token.name === 'newline') {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))}, to signify the end of the ${ANSI_Palette.noun.apply_to('String')}, or any character aside from ${ANSI_Palette.bad.apply_to(Text.escape('\n'))}, to signify a continuation of the ${ANSI_Palette.verb.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape('\n'))}.`));
					}

					switch (current_token.name) {
						case 'paren :: close':
							last_string_part = 'single :: potential-end';
							continue string_loop;
						default:
							string_value += current_token.value;
							continue string_loop;
					}
				case 'single :: potential-end':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))}, to signify the end of the ${ANSI_Palette.noun.apply_to('String')}, or any other character, to signify a continuation of the ${ANSI_Palette.verb.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					}

					switch (current_token.name) {
						case 'newline':
							this.#advance_token(tokens);

							break string_loop;
						default:
							last_string_part = 'single :: body';
							string_value += `)${current_token.value}`;
							continue string_loop;
					}
				case 'multi :: line-end':
					for (let i = 0; i < this.#tab_indent_count; i++) {
						if (current_token === false) {
							if (i === (Math.max(this.#tab_indent_count - 2, 0))) {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('String')} wrapper indentation level, or ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))} to signify the end of the ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
							} else {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('String')} wrapper indentation level. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
							}
						} else if (!(current_token.name === 'tab' || (i === (Math.max(this.#tab_indent_count - 2, 0)) && current_token.name === 'paren :: close'))) {
							if (Math.max(this.#tab_indent_count - 2, 0)) {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('String')} wrapper indentation level, or ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))} to signify the end of the ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
							} else {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('String')} wrapper indentation level. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
							}
						}

						if (current_token.name === 'paren :: close') {
							last_string_part = 'multi :: potential-end';
							continue string_loop;
						}

						if (i < (this.#tab_indent_count - 1)) {
							current_token = this.#advance_token(tokens);
						}
					}

					last_string_part = 'multi :: tab-indent-end';
					continue string_loop;
				case 'multi :: tab-indent-end':
				case 'multi :: body':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))} to signify the end of the current line of the multi-line ${ANSI_Palette.noun.apply_to('String')} or any other character to signify a continuation of the current line of the multi-line ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape('end of file'))}.`));
					}

					switch (current_token.name) {
						case 'newline':
							last_string_part = 'multi :: line-end';
							string_value += current_token.value;
							continue string_loop;
						default:
							last_string_part = 'multi :: body';
							string_value += current_token.value;
							continue string_loop;
					}
				case 'multi :: potential-end':
					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))} to signify the end of the multi-line ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape('end of file'))}.`));
					} else if (!(current_token.name === 'newline')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))} to signify the end of the multi-line ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					if (string_value.endsWith('\r\n')) {
						string_value = string_value.slice(0, -2);
					} else if (string_value.endsWith('\n')) {
						string_value = string_value.slice(0, -1);
					}

					this.#tab_indent_count -= 1;
					this.#advance_token(tokens);

					break string_loop;
			}
		}

		const current_ast_context = this.#current_ast_context();

		if ('object' in current_ast_context && 'key' in current_ast_context) {
			current_ast_context.object[current_ast_context.key] = string_value;
			this.#ascend_ast_context();
		} else if ('list' in current_ast_context) {
			current_ast_context.list.push(string_value);
		}
	}

	#parse_list(tokens) {
		// TODO
	}

	#parse_object(tokens) {
		// TODO
	}

	#current_token(tokens) {
		if (this.#token_index === tokens.length) {
			return false;
		}

		return tokens[this.#token_index];
	}

	#advance_token(tokens) {
		const current_token = this.#current_token(tokens);

		if (current_token === false) {
			return current_token;
		}

		if (current_token.name === 'newline') {
			this.#line_index += 1;
			this.#char_index = 0;
		} else {
			this.#char_index += 1;
		}

		this.#token_index += 1;

		return this.#current_token(tokens);
	}

	#reset_fields() {
		this.#ast = {};
		this.#ast_context_stack = [{object: this.#ast}];
		this.#token_index = 0;
		this.#line_index = 1;
		this.#char_index = 1;
		this.#tab_indent_count = 0;
	}

	#current_ast_context() {
		return this.#ast_context_stack[this.#ast_context_stack.length - 1];
	}

	#ascend_ast_context() {
		this.#ast_context_stack.pop();

		return this.#current_ast_context();
	}

	#descend_ast_context(new_ast_context) {
		this.#ast_context_stack.push(new_ast_context);
	}

	#error_message__parse_error(explanation) {
		return `${ANSI_Palette.noun.apply_to('InterLang')} Parse Error @[line: ${ANSI_Palette.focal_point.apply_to(this.#line_index)} | char: ${ANSI_Palette.focal_point.apply_to(this.#char_index)}] ${ANSI_Palette.ancillary.apply_to('::')} ${explanation}`;
	}
}
