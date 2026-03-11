export class CheckType {
	static is_bool(bool) {
		return typeof bool === 'boolean';
	}

	static is_string(string) {
		return typeof string === 'string';
	}

	static is_type(value, type) {
		if (!(typeof type === 'function' && 'prototype' in type)) {
			return false;
		}

		return value instanceof type;
	}

	static object_has_key(object, key) {
		if (!(typeof object === 'object')) {
			return false;
		}

		if (!(typeof key === 'string' || typeof key === 'symbol')) {
			return false;
		}

		return key in object;
	}
}
