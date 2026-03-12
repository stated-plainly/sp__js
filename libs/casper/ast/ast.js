import { CheckType } from '../../types/check_type.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';

export class AST {
	static #variable_access_modifiers = [
		{ id: Symbol(), name: '{immut}' },
		{ id: Symbol(), name: 'inmut' },
		{ id: Symbol(), name: 'exmut' },
		{ id: Symbol(), name: 'mut' },
	];

	static get_variable_access_modifier_id(name) {
		if (!CheckType.is_string(name)) {
			throw new IllegalArgTypeError('name', 'String');
		}

		const modifier = AST.#variable_access_modifiers.find(m => m.name === name);

		if (CheckType.is_undefined(modifier)) {
			throw new IllegalArgTypeError('name', 'VariableAccessModifier');
		}

		return modifier.id;
	}

	static get_variable_access_modifier_name(id) {
		if (!CheckType.is_symbol(id)) {
			throw new IllegalArgTypeError('id', 'Symbol');
		}

		const modifier = AST.#variable_access_modifiers.find(m => m.id === id);

		if (CheckType.is_undefined(modifier)) {
			throw new IllegalArgTypeError('name', 'VariableAccessModifier');
		}

		return modifier.name;
	}

	static #param_type_modifiers = [
		{ id: Symbol(), name: 'borrow' },
		{ id: Symbol(), name: 'consume' },
	];

	static get_param_type_modifier_id(name) {
		if (!CheckType.is_string(name)) {
			throw new IllegalArgTypeError('name', 'String');
		}

		const modifier = AST.#param_type_modifiers.find(m => m.name === name);

		if (CheckType.is_undefined(modifier)) {
			throw new IllegalArgTypeError('name', 'ParamTypeModifier');
		}

		return modifier.id;
	}

	static get_param_type_modifier_name(id) {
		if (!CheckType.is_symbol(id)) {
			throw new IllegalArgTypeError('id', 'Symbol');
		}

		const modifier = AST.#param_type_modifiers.find(m => m.id === id);

		if (CheckType.is_undefined(modifier)) {
			throw new IllegalArgTypeError('name', 'ParamTypeModifier');
		}

		return modifier.name;
	}
}
