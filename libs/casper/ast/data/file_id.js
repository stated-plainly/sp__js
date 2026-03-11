export class FileID {
	#id;

	constructor() {
		this.#id = Symbol();
	}

	get id() {
		return this.#id;
	}
}
