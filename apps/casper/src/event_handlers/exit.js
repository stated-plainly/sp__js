// libs
import { IllegalArgTypeError } from '../../../../libs/errors/illegal_arg_type_error.js';
import { CheckType } from '../../../../libs/types/check_type.js';
import { PrintType } from '../../../../libs/types/print_type.js';
// local
import { print_help } from '../print_functions/print_help.js';

export function exit(data) {
	if (CheckType.object_has_key(data, 'print_help')) {
		if (!CheckType.is_bool(data.print_help)) {
			throw new IllegalArgTypeError(`data.print_help`, PrintType.bool())
		}

		print_help();
	}

	if (CheckType.object_has_key(data, 'error_message')) {
		if (!CheckType.is_string(data.error_message)) {
			throw new IllegalArgTypeError('data.error_message', PrintType.string());
		}

		console.error(data.error_message);
	}

	process.exit();
}
