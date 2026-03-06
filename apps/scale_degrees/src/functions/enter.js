import { EventBus } from '../../../../libs/singletons/event_bus.js';

export function enter() {
	console.clear();
	EventBus.trigger('main');
}
