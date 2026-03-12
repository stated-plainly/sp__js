// libs
import { EventBus } from '../../../../libs/events/event_bus.js';
// local
import { build } from '../commands/build.js';
import { run } from '../commands/run.js';

export function enter() {
	switch (process.argv.length) {
		case 3:
			process_command(process.argv[2]);
			break;
		default:
			EventBus.trigger('exit', { print_help: true })
	}
}

function process_command(command) {
    switch (command) {
        case 'build':
			build();
            break;
        case 'run':
			run();
            break;
        default:
			EventBus.trigger('exit', { print_help: true })
    }
}
