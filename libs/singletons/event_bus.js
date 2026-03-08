// libs
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error.js';

export class EventBus {
    static #events = {}

    static add(event, listener) {
        if (!(typeof event === 'string')) {
			throw new IllegalArgTypeError('event', 'String');
        }

        if (!(typeof listener === 'function')) {
			throw new IllegalArgTypeError('listener', 'Function');
        }

        if (event in EventBus.#events) {
            EventBus.#events[event].push(event);
        } else {
            EventBus.#events[event] = [listener];
        }

		return EventBus;
    }

    static remove(event, listener = null) {
        if (!(typeof event === 'string')) {
			throw new IllegalArgTypeError('event', 'String');
        }

        if (!(typeof listener === 'function' || listener === null)) {
			throw new IllegalArgTypeError('listener', 'Function | null');
        }

        (listener === null) ? EventBus.#remove_event(event) : EventBus.#remove_listener(event, listener);

		return EventBus;
    }

    static trigger(event, data) {
        if (!(typeof event === 'string')) {
			throw new IllegalArgTypeError('event', 'String');
        }

        if (!(event in EventBus.#events)) {
            return;
        }

        for (const listener of EventBus.#events[event]) {
            listener(data);
        }

		return EventBus;
    }

    static #remove_event(event) {
        if (!(event in EventBus.#events)) {
            return;
        }

        delete EventBus.#events[event];
    }

    static #remove_listener(event, listener) {
        if (!(event in EventBus.#events)) {
            return;
        }

        EventBus.#events[event] = EventBus.#events[event].filter(l => l !== listener);
    }
}
