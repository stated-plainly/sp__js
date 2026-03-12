import { EventBus } from '../../../../libs/events/event_bus.js';

export function enter() {
	console.clear();
	EventBus.trigger('main');
}
