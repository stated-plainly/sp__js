import { IllegalArgTypeError } from "../../../../errors/illegal_arg_type_error";
import { CheckASTType } from "../../../helpers/check_ast_type";

export class BNotOperation {
	#operand;

	constructor(operand) {
		if (!CheckASTType.is_b(operand)) {
			throw new IllegalArgTypeError('operand', 'B');
		}

		this.#operand = operand;
	}

	get operand() {
		return this.#operand;
	}
}
