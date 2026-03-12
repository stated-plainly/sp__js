import { CheckCasperValue } from '../helpers/check_casper_value.js';
import { CheckType } from '../../types/check_type.js';
import { IllegalArgTypeError } from '../../errors/illegal_arg_type_error.js';
import { PrimitiveID } from '../helpers/primitive_id.js';

export class Literal {
	#primitive_id;
	#value;

	constructor(value, primitive_id) {
		if (!CheckType.is_string(value)) {
			throw new IllegalArgTypeError('value', 'String');
		}

		if (!PrimitiveID.as_list().some(p_id => primitive_id === p_id)) {
			throw new IllegalArgTypeError('primitive_id', 'PrimitiveID');
		}

		switch (primitive_id) {
			// bit
			case PrimitiveID.__bit:
				if (!CheckCasperValue.is_bit(value)) {
					throw new IllegalArgTypeError('value', 'bit');
				}
				break;
			// b{size}
			case PrimitiveID.__b8:
				if (!CheckCasperValue.is_b8(value)) {
					throw new IllegalArgTypeError('value', 'b8');
				}
				break;
			case PrimitiveID.__b16:
				if (!CheckCasperValue.is_b16(value)) {
					throw new IllegalArgTypeError('value', 'b16');
				}
				break;
			case PrimitiveID.__b32:
				if (!CheckCasperValue.is_b32(value)) {
					throw new IllegalArgTypeError('value', 'b32');
				}
				break;
			case PrimitiveID.__b64:
				if (!CheckCasperValue.is_b64(value)) {
					throw new IllegalArgTypeError('value', 'b64');
				}
				break;
			case PrimitiveID.__b128:
				if (!CheckCasperValue.is_b128(value)) {
					throw new IllegalArgTypeError('value', 'b128');
				}
				break;
			// h{size}
			case PrimitiveID.__h8:
				if (!CheckCasperValue.is_h8(value)) {
					throw new IllegalArgTypeError('value', 'h8');
				}
				break;
			case PrimitiveID.__h16:
				if (!CheckCasperValue.is_h16(value)) {
					throw new IllegalArgTypeError('value', 'h16');
				}
				break;
			case PrimitiveID.__h32:
				if (!CheckCasperValue.is_h32(value)) {
					throw new IllegalArgTypeError('value', 'h32');
				}
				break;
			case PrimitiveID.__h64:
				if (!CheckCasperValue.is_h64(value)) {
					throw new IllegalArgTypeError('value', 'h64');
				}
				break;
			case PrimitiveID.__h128:
				if (!CheckCasperValue.is_h128(value)) {
					throw new IllegalArgTypeError('value', 'h128');
				}
				break;
			// u{size}
			case PrimitiveID.__u8:
				if (!CheckCasperValue.is_u8(value)) {
					throw new IllegalArgTypeError('value', 'u8');
				}
				break;
			case PrimitiveID.__u16:
				if (!CheckCasperValue.is_u16(value)) {
					throw new IllegalArgTypeError('value', 'u16');
				}
				break;
			case PrimitiveID.__u32:
				if (!CheckCasperValue.is_u32(value)) {
					throw new IllegalArgTypeError('value', 'u32');
				}
				break;
			case PrimitiveID.__u64:
				if (!CheckCasperValue.is_u64(value)) {
					throw new IllegalArgTypeError('value', 'u64');
				}
				break;
			case PrimitiveID.__u128:
				if (!CheckCasperValue.is_u128(value)) {
					throw new IllegalArgTypeError('value', 'u128');
				}
				break;
		}

		this.#primitive_id = primitive_id;
		this.#value = value;
	}

	get primitive_id() {
		return this.#primitive_id;
	}

	get value() {
		return this.#value;
	}
}
