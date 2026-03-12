export class BuiltInID {
	#id;

	constructor() {
		this.#id = Symbol();
	}

	get id() {
		return this.#id;
	}
}
