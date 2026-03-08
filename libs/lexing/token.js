export class Token {
	#name;
	#value;

	constructor(name, value) {
		if (!(typeof name === 'string')) {
			throw new Error(`Illegal 'name' value provided. Must be a string.`);
		}

		if (!(typeof value === 'string')) {
			throw new Error(`Illegal 'value' value provided. Must be a string.`);
		}

		this.#name = name;
		this.#value = value;
	}

	get name() {
		return this.#name;
	}

	get value() {
		return this.#value;
	}
}
