// libs
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error.js';

export class Text {
	static escape(text) {
		if (!(typeof text === 'string')) {
			throw new IllegalArgTypeError('text', 'String');
		}

		return JSON.stringify(text).slice(1, -1);
	}
}
