// libs
import { EventBus } from '../../../../libs/events/event_bus.js';
// local
import { build } from '../commands/build.js';
import { Command } from '../enums/command.js';
import { run } from '../commands/run.js';

export function process_command(command_text) {
	const command = Command.from_text(command_text);

	if (command === false) {
		EventBus.trigger('exit', {print_help: true});
	}

	switch (command) {
		case Command.__build:
			build();
			break;
		case Command.__run:
			run();
			break;
	}
}
