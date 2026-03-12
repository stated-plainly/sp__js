import { IllegalArgTypeError } from "../errors/illegal_arg_type_error";

export class CheckType {
	static is_bool(value) {
		return typeof value === 'boolean';
	}

	static is_null(value) {
		return value === null;
	}

	static is_undefined(value) {
		return value === undefined;
	}

	static is_string(value) {
		return typeof value === 'string';
	}

	static is_symbol(value) {
		return typeof value === 'symbol';
	}

	static is_list(value) {
		return Array.isArray(value);
	}

	static is_type(value, type) {
		if (!(typeof type === 'function' && 'prototype' in type)) {
			throw IllegalArgTypeError('type', 'Type');
		}

		return value instanceof type;
	}

	static object_has_key(object, key) {
		if (!(typeof object === 'object' && !CheckType.is_list(object) && !CheckType.is_null(object))) {
			throw new IllegalArgTypeError('object', 'Object');
		}

		if (!(typeof key === 'string' || typeof key === 'symbol')) {
			throw new IllegalArgTypeError('key', 'String | Symbol');
		}

		return key in object;
	}
}
