import { Colour } from './colour.js';

export class ANSI {
	static #__bold = Symbol();
	static #__dim = Symbol();
	static #__italic = Symbol();
	static #__underline = Symbol();
	static #__blink = Symbol();
	static #__inverse = Symbol();
	static #__hidden = Symbol();
	static #__strikethrough = Symbol();
	static #__colour = Symbol();
	static #__bg_colour = Symbol();

	static #style_data = {
		[ANSI.#__bold]: {set: 1, reset: 22},
		[ANSI.#__dim]: {set: 2, reset: 22},
		[ANSI.#__italic]: {set: 3, reset: 23},
		[ANSI.#__underline]: {set: 4, reset: 24},
		[ANSI.#__blink]: {set: 5, reset: 25},
		[ANSI.#__inverse]: {set: 7, reset: 27},
		[ANSI.#__hidden]: {set: 8, reset: 28},
		[ANSI.#__strikethrough]: {set: 9, reset: 29},
		[ANSI.#__colour]: {set: 38, reset: 39},
		[ANSI.#__bg_colour]: {set: 48, reset: 39},
	};

	#style_rules;

	constructor() {
		this.#style_rules = [];
	}

	bold() {
		this.#style_rules.push({rule: ANSI.#__bold});
		
		return this;
	}

	dim() {
		this.#style_rules.push({rule: ANSI.#__dim});
		
		return this;
	}

	italic() {
		this.#style_rules.push({rule: ANSI.#__italic});
		
		return this;
	}

	underline() {
		this.#style_rules.push({rule: ANSI.#__underline});
		
		return this;
	}

	blink() {
		this.#style_rules.push({rule: ANSI.#__blink});
		
		return this;
	}

	inverse() {
		this.#style_rules.push({rule: ANSI.#__inverse});
		
		return this;
	}

	hidden() {
		this.#style_rules.push({rule: ANSI.#__hidden});
		
		return this;
	}

	strikethrough() {
		this.#style_rules.push({rule: ANSI.#__strikethrough});
		
		return this;
	}

	bg_colour(colour) {
		if (!(colour instanceof Colour)) {
			throw new Error(`Illegal 'colour' value provided. Must be of type Colour.`);
		}

		this.#style_rules.push({rule: ANSI.#__bg_colour, colour: colour});

		return this;
	}

	colour(colour) {
		if (!(colour instanceof Colour)) {
			throw new Error(`Illegal 'colour' value provided. Must be of type Colour.`);
		}

		this.#style_rules.push({rule: ANSI.#__colour, colour: colour});

		return this;
	}

	apply_to(text) {
		for (const rule_data of this.#style_rules) {
			switch (rule_data.rule) {
				case ANSI.#__bold:
				case ANSI.#__dim:
				case ANSI.#__italic:
				case ANSI.#__underline:
				case ANSI.#__blink:
				case ANSI.#__inverse:
				case ANSI.#__hidden:
				case ANSI.#__strikethrough:
					{
						const sd = ANSI.#style_data[rule_data.rule];
						text = `\x1b[${sd.set}m${text}\x1b[${sd.reset}m`;
					}
					break;
				case ANSI.#__colour:
					{
						const sd = ANSI.#style_data[rule_data.rule];
						const c = rule_data.colour;
						text = `\x1b[${sd.set};2;${c.r};${c.g};${c.b}m${text}\x1b[${sd.reset}m`;
					}
					break;
			}
		}

		return text;
	}
}
