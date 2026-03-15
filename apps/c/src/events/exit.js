import { print_help } from '../functions/print_help.js';

export function exit(data) {
	if (typeof data.error_message === 'string') {
		console.error(data.error_message);
	}

	if (data.print_help === true) {
		print_help();
	}

	process.exit();
}
