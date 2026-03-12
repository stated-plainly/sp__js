export class CallbackID {
	#id;

	constructor() {
		this.#id = Symbol();
	}

	get id() {
		return this.#id;
	}
}
