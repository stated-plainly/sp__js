import { CallbackID } from '../ids/callback_id.js';
import { EnumID } from '../ids/enum_id.js';
import { InterfaceID } from '../ids/interface_id.js';
import { ObjectID } from '../ids/object_id.js';
import { PrimitiveID } from '../ids/primitive_id.js';

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
}
