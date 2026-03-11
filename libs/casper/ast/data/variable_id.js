export class VariableID {
	#id;

	constructor() {
		this.#id = Symbol();
	}

	get id() {
		return this.#id;
	}
}
