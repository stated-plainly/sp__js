import { Colour } from './colour.js';

export class ANSI {
	static #bold = Symbol();
	static #dim = Symbol();
	static #italic = Symbol();
	static #underline = Symbol();
	static #blink = Symbol();
	static #inverse = Symbol();
	static #hidden = Symbol();
	static #strikethrough = Symbol();
	static #colour = Symbol();
	static #bg_colour = Symbol();

	static #style_data = {
		[ANSI.#bold]: {set: 1, reset: 22},
		[ANSI.#dim]: {set: 2, reset: 22},
		[ANSI.#italic]: {set: 3, reset: 23},
		[ANSI.#underline]: {set: 4, reset: 24},
		[ANSI.#blink]: {set: 5, reset: 25},
		[ANSI.#inverse]: {set: 7, reset: 27},
		[ANSI.#hidden]: {set: 8, reset: 28},
		[ANSI.#strikethrough]: {set: 9, reset: 29},
		[ANSI.#colour]: {set: 38, reset: 39},
		[ANSI.#bg_colour]: {set: 48, reset: 39},
	};

	#style_rules;

	constructor() {
		this.#style_rules = [];
	}

	bold() {
		this.#style_rules.push({rule: ANSI.#bold});
		
		return this;
	}

	dim() {
		this.#style_rules.push({rule: ANSI.#dim});
		
		return this;
	}

	italic() {
		this.#style_rules.push({rule: ANSI.#italic});
		
		return this;
	}

	underline() {
		this.#style_rules.push({rule: ANSI.#underline});
		
		return this;
	}

	blink() {
		this.#style_rules.push({rule: ANSI.#blink});
		
		return this;
	}

	inverse() {
		this.#style_rules.push({rule: ANSI.#inverse});
		
		return this;
	}

	hidden() {
		this.#style_rules.push({rule: ANSI.#hidden});
		
		return this;
	}

	strikethrough() {
		this.#style_rules.push({rule: ANSI.#strikethrough});
		
		return this;
	}

	bg_colour(colour) {
		if (!(colour instanceof Colour)) {
			throw new Error(`Illegal 'colour' value provided. Must be of type Colour.`);
		}

		this.#style_rules.push({rule: ANSI.#bg_colour, colour: colour});

		return this;
	}

	colour(colour) {
		if (!(colour instanceof Colour)) {
			throw new Error(`Illegal 'colour' value provided. Must be of type Colour.`);
		}

		this.#style_rules.push({rule: ANSI.#colour, colour: colour});

		return this;
	}

	apply_to(text) {
		for (const rule_data of this.#style_rules) {
			switch (rule_data.rule) {
				case ANSI.#bold:
				case ANSI.#dim:
				case ANSI.#italic:
				case ANSI.#underline:
				case ANSI.#blink:
				case ANSI.#inverse:
				case ANSI.#hidden:
				case ANSI.#strikethrough:
					{
						const sd = ANSI.#style_data[rule_data.rule];
						text = `\x1b[${sd.set}m${text}\x1b[${sd.reset}m`;
					}
					break;
				case ANSI.#colour:
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
