import { B8Literal } from '../../literals/b8_literal.js';
import { CheckType } from '../../../../types/check_type.js';
import { IllegalArgTypeError } from '../../../../errors/illegal_arg_type_error.js';

export class B8BitwiseNotOperation {
	#operand;

	constructor(operand) {
		if (!CheckType.is_type(operand, B8Literal)) {
			throw new IllegalArgTypeError('operand', 'B8Literal');
		}

		this.#operand = operand;
	}

	get operand() {
		return this.#operand;
	}
}
