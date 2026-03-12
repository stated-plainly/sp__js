import { IllegalArgTypeError } from '../../../errors/illegal_arg_type_error';
import { CheckType } from '../../../types/check_type.js';
import { CheckASTType } from '../helpers/check_ast_type';
import { SlotAccessModifierID } from '../ids/slot_access_modifier_id';
import { TypeAccessModifierID } from '../ids/type_access_modifier_id';

export class Param {
	#slot_access_modifier_id;
	#name;
	#type_access_modifier_id;
	#type_id;

	constructor(slot_access_modifier_id, name, type_access_modifier_id, type_id) {
		if (!CheckType.is_type(slot_access_modifier_id, SlotAccessModifierID)) {
			throw new IllegalArgTypeError('slot_access_modifier_id', 'SlotAccessModifierID');
		}

		if (!CheckType.is_string(name)) {
			throw new IllegalArgTypeError('name', 'String');
		}

		if (!CheckType.is_type(type_access_modifier_id, TypeAccessModifierID)) {
			throw new IllegalArgTypeError('type_access_modifier_id', 'TypeAccessModifierID');
		}

		if (!CheckASTType.is_type_id(type_id)) {
			throw new IllegalArgTypeError('type_id', 'TypeID');
		}

		this.#slot_access_modifier_id = slot_access_modifier_id;
		this.#name = name;
		this.#type_access_modifier_id = type_access_modifier_id;
		this.#type_id = type_id;
	}

	get slot_access_modifier_id() {
		return this.#slot_access_modifier_id;
	}

	get name() {
		return this.#name;
	}

	get type_access_modifier_id() {
		return this.#type_access_modifier_id;
	}

	get type_id() {
		return this.#type_id;
	}
}
