export class EventBus {
    static #events = {}

    static add(event, listener) {
        if (!(typeof event === 'string')) {
            throw new Error(`Illegal 'event' value provided. Must be a string.`);
        }

        if (!(typeof listener === 'function')) {
            throw new Error(`Illegal 'listener' value provided. Must be a function.`);
        }

        if (event in EventBus.#events) {
            EventBus.#events[event].push(event);
        } else {
            EventBus.#events[event] = [listener];
        }
    }

    static remove(event, listener = null) {
        if (!(typeof event === 'string')) {
            throw new Error(`Illegal 'event' value provided. Must be a string.`);
        }

        if (!(typeof listener === 'function' || listener === null)) {
            throw new Error(`Illegal 'listener' value provided. Must be a function or null.`);
        }

        (listener === null) ? EventBus.#remove_event(event) : EventBus.#remove_listener(event, listener);
    }

    static trigger(event, data) {
        if (!(typeof event === 'string')) {
            throw new Error(`Illegal 'event' value provided. Must be a string.`);
        }

        if (!(typeof data === 'object')) {
            throw new Error(`Illegal 'data' value provided. Must be an object.`);
        }

        if (!(event in EventBus.#events)) {
            return;
        }

        for (const listener of EventBus.#events[event]) {
            listener(data);
        }
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
