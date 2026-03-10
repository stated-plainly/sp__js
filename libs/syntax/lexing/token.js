// libs
import { ANSI_Palette } from '../../graphics/ansi/ansi_palette.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';
import { Text } from '../../text/text.js';

export class Token {
	#name;
	#value;

	constructor(name, value) {
		if (!(typeof name === 'string')) {
			throw new IllegalArgTypeError('name', 'String');
		}

		if (!(typeof value === 'string')) {
			throw new IllegalArgTypeError('value', 'String');
		}

		this.#name = name;
		this.#value = value;
	}

	get name() {
		return this.#name;
	}

	get value() {
		return this.#value;
	}

	get type_info() {
		return `Token(${ANSI_Palette.verb.apply_to(this.name)} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.focal_point.apply_to(`"${Text.escape(this.value)}"`)})`;
	}
}
