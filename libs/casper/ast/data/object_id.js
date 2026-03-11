export class ObjectID {
	#id;

	constructor() {
		this.#id = Symbol();
	}

	get id() {
		return this.#id;
	}
}
