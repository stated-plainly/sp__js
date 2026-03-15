// libs
import { EventBus } from '../../../../libs/events/event_bus.js';
// local
import { process_command } from '../functions/process_command.js';

export function enter() {
	switch (process.argv.length) {
		case 3:
			process_command(process.argv[2]);
			break;
		default:
			EventBus.trigger('exit', {print_help: true});
	}
}
