import { IllegalArgTypeError } from "../../../errors/illegal_arg_type_error";
import { CheckASTType } from "../helpers/check_ast_type";

export class ReturnType {
	#type_id;

	constructor(type_id) {
		if (!CheckASTType.is_type_id(type_id)) {
			throw new IllegalArgTypeError('type_id', 'TypeID');
		}

		this.#type_id = type_id;
	}

	get type_id() {
		return this.#type_id;
	}
}
