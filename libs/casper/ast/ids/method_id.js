export class MethodID {
	#id;

	constructor() {
		this.#id = Symbol();
	}

	get id() {
		this.#id;
	}
}
