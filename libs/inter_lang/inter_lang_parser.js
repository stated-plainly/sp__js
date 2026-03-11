// libs
import { ANSI_Palette } from '../graphics/ansi/ansi_palette.js';
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error.js';
import { Text } from '../text/text.js';
import { Token } from '../syntax/lexing/token.js';
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
		let current_token = this.#current_token(tokens);

		let key_value = '';
		let value_type = '';

		let next_kvp_part = 'pre-key :: tab-indents';

		kvp_loop: while (true) {
			switch (next_kvp_part) {
				case 'pre-key :: tab-indents':
					if (this.#tab_indent_count > 0) {
						for (let i = 0; i < this.#tab_indent_count; i++) {
							if (current_token === false) {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('Object')} wrapper indentation level. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
							} else if (!(current_token.name === 'tab')) {
								throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} ${ANSI_Palette.verb.apply_to(i + 1)}/${this.#tab_indent_count} to continue indentation to ${ANSI_Palette.verb.apply_to('1')} in from ${ANSI_Palette.noun.apply_to('Object')} wrapper indentation level. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
							}

							current_token = this.#advance_token(tokens);
						}
					}

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} to signify the start of a key. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					}
					
					next_kvp_part = 'key :: letter_block';
					continue kvp_loop;
				case 'key :: letter_block':
					key_value += current_token.value;

					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'letter :: lower' || current_token.name === 'underscore' || current_token.name === 'colon')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					switch (current_token.name) {
						case 'letter :: lower':
							continue kvp_loop;
						case 'underscore':
							next_kvp_part = 'key :: divider';
							continue kvp_loop;
						case 'colon':
							next_kvp_part = 'kvp divider';
							continue kvp_loop;
					}
				case 'key :: number_block':
					key_value += current_token.value;

					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[0-9]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'number' || current_token.name === 'underscore' || current_token.name === 'colon')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[0-9]')} or ${ANSI_Palette.focal_point.apply_to('_')} to continue the current key, or ${ANSI_Palette.focal_point.apply_to(':')} to end it. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					switch (current_token.name) {
						case 'number':
							continue kvp_loop;
						case 'underscore':
							next_kvp_part = 'key :: divider';
							continue kvp_loop;
						case 'colon':
							next_kvp_part = 'kvp divider';
							continue kvp_loop;
					}
				case 'key :: divider':
					key_value += current_token.value;

					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('[0-9]')} to continue the current key. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'letter :: lower' || current_token.name === 'number')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('[a-z]')} or ${ANSI_Palette.focal_point.apply_to('[0-9]')} to continue the current key. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					switch (current_token.name) {
						case 'letter :: lower':
							next_kvp_part = 'key :: letter_block';
							continue kvp_loop;
						case 'number':
							next_kvp_part = 'key :: number_block';
							continue kvp_loop;
					}
				case 'kvp divider':
					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('" "')} to separate the current KVP. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'whitespace')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('" "')} to separate the current KVP. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('(')} to signify the start of a ${ANSI_Palette.verb.apply_to('String')} or ${ANSI_Palette.focal_point.apply_to('[')} to signify the start of a ${ANSI_Palette.verb.apply_to('List')} or ${ANSI_Palette.focal_point.apply_to('{')} to signify the start of an ${ANSI_Palette.verb.apply_to('Object')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (!(current_token.name === 'paren :: open' || current_token.name === 'square :: open' || current_token.name === 'curly :: open')) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to('(')} to signify the start of a ${ANSI_Palette.verb.apply_to('String')} or ${ANSI_Palette.focal_point.apply_to('[')} to signify the start of a ${ANSI_Palette.verb.apply_to('List')} or ${ANSI_Palette.focal_point.apply_to('{')} to signify the start of an ${ANSI_Palette.verb.apply_to('Object')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
					}

					next_kvp_part = 'value';
					continue kvp_loop;
				case 'value':
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

					break kvp_loop;
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
		let current_token = this.#current_token(tokens);

		let string_value = '';

		let next_string_part = 'start';

		string_loop: while (true) {
			switch (next_string_part) {
				case 'start':
					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))}, to signify the start of a multi-line ${ANSI_Palette.verb.apply_to('String')} or ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))}, to signify the end of the ${ANSI_Palette.verb.apply_to('String')}, or any other character, to signify part of the ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					}
					
					switch (current_token.name) {
						case 'newline':
							this.#tab_indent_count += 1;
							next_string_part = 'multi :: line-end';
							continue string_loop;
						case 'paren :: close':
							next_string_part = 'single :: potential-end';
							continue string_loop;
						default:
							next_string_part = 'single :: body';
							continue string_loop;
					}
				case 'single :: body':
					string_value += current_token.value;

					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))}, to signify the end of the ${ANSI_Palette.noun.apply_to('String')}, or any character aside from ${ANSI_Palette.bad.apply_to(Text.escape('\n'))}, to signify a continuation of the ${ANSI_Palette.verb.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					} else if (current_token.name === 'newline') {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))}, to signify the end of the ${ANSI_Palette.noun.apply_to('String')}, or any character aside from ${ANSI_Palette.bad.apply_to(Text.escape('\n'))}, to signify a continuation of the ${ANSI_Palette.verb.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape('\n'))}.`));
					}

					switch (current_token.name) {
						case 'paren :: close':
							next_string_part = 'single :: potential-end';
							continue string_loop;
						default:
							continue string_loop;
					}
				case 'single :: potential-end':
					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))}, to signify the end of the ${ANSI_Palette.noun.apply_to('String')}, or any other character, to signify a continuation of the ${ANSI_Palette.verb.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					}

					switch (current_token.name) {
						case 'newline':
							next_string_part = 'end'
							continue string_loop;
						default:
							string_value += `)`;
							next_string_part = 'single :: body';
							continue string_loop;
					}
				case 'multi :: line-end':
					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						if (this.#tab_indent_count === 1) {
							throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} to signify the start of the next multi-line ${ANSI_Palette.noun.apply_to('String')} line, or ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))} to signify the end of the multi-line ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
						} else {
							throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} to signify the start of the next multi-line ${ANSI_Palette.noun.apply_to('String')} line. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
						}
					} else if (!(current_token.name === 'tab' || (this.#tab_indent_count === 1 && current_token.name === 'paren :: close'))) {
						if (this.#tab_indent_count === 1) {
							throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} to signify the start of the next multi-line ${ANSI_Palette.noun.apply_to('String')} line, or ${ANSI_Palette.focal_point.apply_to(Text.escape(')\n'))} to signify the end of the multi-line ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
						} else {
							throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\t'))} to signify the start of the next multi-line ${ANSI_Palette.noun.apply_to('String')} line. Encountered ${ANSI_Palette.bad.apply_to(Text.escape(current_token.value))}.`));
						}
					}

					switch (current_token.name) {
						case 'tab':
							next_string_part = 'multi :: tab-indents';
							continue string_loop;
						case 'paren :: close':
							next_string_part = 'multi :: potential-end';
							continue string_loop;
					}
				case 'multi :: tab-indents':
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
							next_string_part = 'multi :: potential-end';
							continue string_loop;
						}

						current_token = this.#advance_token(tokens);
					}

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))} to signify the end of the current line of the multi-line ${ANSI_Palette.noun.apply_to('String')} or any other character to signify a continuation of the current line of the multi-line ${ANSI_Palette.noun.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to(Text.escape('end of file'))}.`));
					}

					next_string_part = 'multi :: body';
					continue string_loop;
				case 'multi :: body':
					string_value += current_token.value;

					current_token = this.#advance_token(tokens);

					if (current_token === false) {
						throw new UserError(this.#error_message__parse_error(`Expected ${ANSI_Palette.focal_point.apply_to(Text.escape('\n'))}, to signify the end of the current multi-line ${ANSI_Palette.noun.apply_to('String')} line, or any character to signify a continuation of the line ${ANSI_Palette.verb.apply_to('String')}. Encountered ${ANSI_Palette.bad.apply_to('end of file')}.`));
					}

					switch (current_token.name) {
						case 'newline':
							next_string_part = 'multi :: line-end';
							continue string_loop;
						default:
							continue string_loop;
					}
				case 'multi :: potential-end':
					current_token = this.#advance_token(tokens);

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

					next_string_part = 'end';
					continue string_loop;
				case 'end':
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
