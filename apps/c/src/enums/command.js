export class Command {
	static __build = Symbol();
	static __run = Symbol();

	static illegal_command_message(arg_name) {
		return `Illegal '${arg_name}' provided. Must be a variant of the Command enum.`;
	}

	static as_array() {
		return [
			Command.__build,
			Command.__run,
		];
	}

	static is(command) {
		if (command === Command.__build) {
			return true;
		}

		if (command === Command.__run) {
			return true;
		}

		return false;
	}

	static as_text(command) {
		if (!Command.is(command)) {
			throw new Error(Command.illegal_command_message('command'));
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
			throw new Error(`Illegal 'command_text' provided. Must be a string.`);
		}

		for (const command of Command.as_array()) {
			if (Command.as_text(command) === command_text) {
				return command;
			}
		}

		return false;
	}
}
