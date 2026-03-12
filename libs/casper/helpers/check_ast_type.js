import { CallbackID } from '../ast/constructs/ids/callback_id.js';
import { EnumID } from '../ast/constructs/ids/enum_id.js';
import { InterfaceID } from '../ast/constructs/ids/interface_id.js';
import { ObjectID } from '../ast/constructs/ids/object_id.js';
import { PrimitiveID } from '../ast/constructs/ids/primitive_id.js';

export class CheckASTType {
	static #type_ids = [
		PrimitiveID,
		ObjectID,
		EnumID,
		InterfaceID,
		CallbackID,
	];

	static is_type_id(type) {
		return CheckASTType.#type_ids.every(t_id => type instanceof t_id);
	}

	static is_
}
