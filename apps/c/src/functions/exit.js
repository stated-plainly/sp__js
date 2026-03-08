import { print_help } from './print_help.js';

export function exit(data) {
	if (data.print_help === true) {
		print_help();
	}

	process.exit();
}
