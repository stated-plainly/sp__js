import { Letter } from './letter.js';
import { ScaleDegree } from './scale_degree.js';
import { Character } from './character.js';

export class Note {
	static #min_modifier = -2; // bb is the lowest occurring diatonic flat
	static #max_modifier = 3; // sss is the highest occurring diatonic sharp

	#letter;
	#modifier;

	constructor(letter, modifier) {
		if (!Letter.is(letter)) {
			throw new Error(`Illegal 'letter' value provided.`);
		}

		if (!(typeof modifier === 'number' && Number.isInteger(modifier) && modifier >= Note.#min_modifier && modifier <= Note.#max_modifier)) {
			throw new Error(`Illegal 'modifier' value providied.`);
		}

		this.#letter = letter;
		this.#modifier = modifier;
	}

	get letter() {
		return this.#letter;
	}

	get modifier() {
		return this.#modifier;
	}

	get display_name() {
		let modifier = '';

		if (this.#modifier < 0) {
			for (let i = this.#modifier; i < 0; i++) {
				modifier += Character.__b;
			}
		} else if (this.#modifier > 0) {
			for (let i = 1; i <= this.#modifier; i++) {
				modifier += Character.__s;
			}
		}

		return `${Letter.display_name(this.#letter)}${modifier}`;
	}

	get keyboard_friendly_name() {
		let modifier = '';

		if (this.#modifier < 0) {
			for (let i = this.#modifier; i < 0; i++) {
				modifier += 'b';
			}
		} else if (this.#modifier > 0) {
			for (let i = 1; i <= this.#modifier; i++) {
				modifier += 's';
			}
		}

		return `${Letter.keyboard_friendly_name(this.#letter)}${modifier}`;
	}

	static random_diatonic_root() {
		const letter = Letter.random();
		const modifier = Math.floor(Math.random() * 3) - 1;

		if (!Number.isInteger(modifier) || modifier < -1 || modifier > 1) {
			throw new Error(`The generation of 'modifier' on line 58 is incorrect. Review it.`);
		}

		return new Note(letter, modifier);
	}

	note_at(scale_degree) {
		switch (scale_degree) {
			case ScaleDegree.__1:
				return this.#note_at_1();
			case ScaleDegree.__2b:
				return this.#note_at_2b();
			case ScaleDegree.__2:
				return this.#note_at_2();
			case ScaleDegree.__3b:
				return this.#note_at_3b();
			case ScaleDegree.__3:
				return this.#note_at_3();
			case ScaleDegree.__4:
				return this.#note_at_4();
			case ScaleDegree.__4s:
				return this.#note_at_4s();
			case ScaleDegree.__5b:
				return this.#note_at_5b();
			case ScaleDegree.__5:
				return this.#note_at_5();
			case ScaleDegree.__5s:
				return this.#note_at_5s();
			case ScaleDegree.__6b:
				return this.#note_at_6b();
			case ScaleDegree.__6:
				return this.#note_at_6();
			case ScaleDegree.__7b:
				return this.#note_at_7b();
			case ScaleDegree.__7:
				return this.#note_at_7();
			case ScaleDegree.__8:
				return this.#note_at_8();
			case ScaleDegree.__9b:
				return this.#note_at_9b();
			case ScaleDegree.__9:
				return this.#note_at_9();
			case ScaleDegree.__9s:
				return this.#note_at_9s();
			case ScaleDegree.__11:
				return this.#note_at_11();
			case ScaleDegree.__11s:
				return this.#note_at_11s();
			case ScaleDegree.__13b:
				return this.#note_at_13b();
			case ScaleDegree.__13:
				return this.#note_at_13();
			default:
				throw new Error(`Illegal 'scale_degree' provided.`);
		}
	}

	#note_at_1() {
		return new Note(this.letter, this.modifier);
	}

	#note_at_2b() {
		const note_at_2 = this.#note_at_2();

		return new Note(note_at_2.letter, note_at_2.modifier - 1);
	}

	#note_at_2() {
		switch (this.letter) {
			case Letter.__c:
				return new Note(Letter.__d, this.modifier);
			case Letter.__d:
				return new Note(Letter.__e, this.modifier);
			case Letter.__e:
				return new Note(Letter.__f, this.modifier + 1);
			case Letter.__f:
				return new Note(Letter.__g, this.modifier);
			case Letter.__g:
				return new Note(Letter.__a, this.modifier);
			case Letter.__a:
				return new Note(Letter.__b, this.modifier);
			case Letter.__b:
				return new Note(Letter.__c, this.modifier + 1);
		}
	}

	#note_at_3b() {
		const note_at_3 = this.#note_at_3();

		return new Note(note_at_3.letter, note_at_3.modifier - 1);
	}

	#note_at_3() {
		switch (this.letter) {
			case Letter.__c:
				return new Note(Letter.__e, this.modifier);
			case Letter.__d:
				return new Note(Letter.__f, this.modifier + 1);
			case Letter.__e:
				return new Note(Letter.__g, this.modifier + 1);
			case Letter.__f:
				return new Note(Letter.__a, this.modifier);
			case Letter.__g:
				return new Note(Letter.__b, this.modifier);
			case Letter.__a:
				return new Note(Letter.__c, this.modifier + 1);
			case Letter.__b:
				return new Note(Letter.__d, this.modifier + 1);
		}
	}

	#note_at_4() {
		switch (this.letter) {
			case Letter.__c:
				return new Note(Letter.__f, this.modifier);
			case Letter.__d:
				return new Note(Letter.__g, this.modifier);
			case Letter.__e:
				return new Note(Letter.__a, this.modifier);
			case Letter.__f:
				return new Note(Letter.__b, this.modifier - 1);
			case Letter.__g:
				return new Note(Letter.__c, this.modifier);
			case Letter.__a:
				return new Note(Letter.__d, this.modifier);
			case Letter.__b:
				return new Note(Letter.__e, this.modifier);
		}
	}

	#note_at_4s() {
		const note_at_4 = this.#note_at_4();

		return new Note(note_at_4.letter, note_at_4.modifier + 1);
	}

	#note_at_5b() {
		const note_at_5 = this.#note_at_5();

		return new Note(note_at_5.letter, note_at_5.modifier - 1);
	}

	#note_at_5() {
		switch (this.letter) {
			case Letter.__c:
				return new Note(Letter.__g, this.modifier);
			case Letter.__d:
				return new Note(Letter.__a, this.modifier);
			case Letter.__e:
				return new Note(Letter.__b, this.modifier);
			case Letter.__f:
				return new Note(Letter.__c, this.modifier);
			case Letter.__g:
				return new Note(Letter.__d, this.modifier);
			case Letter.__a:
				return new Note(Letter.__e, this.modifier);
			case Letter.__b:
				return new Note(Letter.__f, this.modifier + 1);
		}
	}

	#note_at_5s() {
		const note_at_5 = this.#note_at_5();

		return new Note(note_at_5.letter, note_at_5.modifier + 1);
	}

	#note_at_6b() {
		const note_at_6 = this.#note_at_6();

		return new Note(note_at_6.letter, note_at_6.modifier - 1);
	}

	#note_at_6() {
		switch (this.letter) {
			case Letter.__c:
				return new Note(Letter.__a, this.modifier);
			case Letter.__d:
				return new Note(Letter.__b, this.modifier);
			case Letter.__e:
				return new Note(Letter.__c, this.modifier + 1);
			case Letter.__f:
				return new Note(Letter.__d, this.modifier);
			case Letter.__g:
				return new Note(Letter.__e, this.modifier);
			case Letter.__a:
				return new Note(Letter.__f, this.modifier + 1);
			case Letter.__b:
				return new Note(Letter.__g, this.modifier + 1);
		}
	}

	#note_at_7b() {
		const note_at_7 = this.#note_at_7();

		return new Note(note_at_7.letter, note_at_7.modifier - 1);
	}

	#note_at_7() {
		switch (this.letter) {
			case Letter.__c:
				return new Note(Letter.__b, this.modifier);
			case Letter.__d:
				return new Note(Letter.__c, this.modifier + 1);
			case Letter.__e:
				return new Note(Letter.__d, this.modifier + 1);
			case Letter.__f:
				return new Note(Letter.__e, this.modifier);
			case Letter.__g:
				return new Note(Letter.__f, this.modifier + 1);
			case Letter.__a:
				return new Note(Letter.__g, this.modifier + 1);
			case Letter.__b:
				return new Note(Letter.__a, this.modifier + 1);
		}
	}

	#note_at_8() {
		return this.#note_at_1();
	}

	#note_at_9b() {
		const note_at_9 = this.#note_at_9();

		return new Note(note_at_9.letter, note_at_9.modifier - 1);
	}

	#note_at_9() {
		return this.#note_at_2();
	}

	#note_at_9s() {
		const note_at_9 = this.#note_at_9();

		return new Note(note_at_9.letter, note_at_9.modifier + 1);
	}

	#note_at_11() {
		return this.#note_at_4();
	}

	#note_at_11s() {
		const note_at_11 = this.#note_at_11();

		return new Note(note_at_11.letter, note_at_11.modifier + 1);
	}

	#note_at_13b() {
		const note_at_13 = this.#note_at_13();

		return new Note(note_at_13.letter, note_at_13.modifier - 1);
	}

	#note_at_13() {
		return this.#note_at_6();
	}
}
