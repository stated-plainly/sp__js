// libs
import { IllegalArgTypeError } from '../../../../libs/errors/illegal_arg_type_error.js';

export class Command {
	static __build = Symbol();
	static __run = Symbol();

	static as_array() {
		return [
			Command.__build,
			Command.__run,
		];
	}

	static is(command) {
		switch (command) {
			case Command.__build:
			case Command.__run:
				return true;
			default:
				return false;
		}
	}

	static as_text(command) {
		if (!Command.is(command)) {
			throw new IllegalArgTypeError('command', 'Command');
		}

		switch (command) {
			case Command.__build:
				return 'build';
			case Command.__run:
				return 'run';
		}
	}

	static from_text(command_text) {
		if (!(typeof command_text === 'string')) {
			throw new IllegalArgTypeError('command_text', 'String');
		}

		for (const command of Command.as_array()) {
			if (Command.as_text(command) === command_text) {
				return command;
			}
		}

		return false;
	}
}
