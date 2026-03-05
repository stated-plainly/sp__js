import { Character } from './character.js';

export class ScaleDegree {
	static __1 = Symbol();
	static __2b = Symbol();
	static __2 = Symbol();
	static __3b = Symbol();
	static __3 = Symbol();
	static __4 = Symbol();
	static __4s = Symbol();
	static __5b = Symbol();
	static __5 = Symbol();
	static __5s = Symbol();
	static __6b = Symbol();
	static __6 = Symbol();
	static __7b = Symbol();
	static __7 = Symbol();
	static __8 = Symbol();
	static __9b = Symbol();
	static __9 = Symbol();
	static __9s = Symbol();
	static __11 = Symbol();
	static __11s = Symbol();
	static __13b = Symbol();
	static __13 = Symbol();

	static random() {
		const i = Math.floor(Math.random() * 22);

		switch (i) {
			case 0:
				return ScaleDegree.__1;
			case 1:
				return ScaleDegree.__2b;
			case 2:
				return ScaleDegree.__2;
			case 3:
				return ScaleDegree.__3b;
			case 4:
				return ScaleDegree.__3;
			case 5:
				return ScaleDegree.__4;
			case 6:
				return ScaleDegree.__4s;
			case 7:
				return ScaleDegree.__5b;
			case 8:
				return ScaleDegree.__5;
			case 9:
				return ScaleDegree.__5s;
			case 10:
				return ScaleDegree.__6b;
			case 11:
				return ScaleDegree.__6;
			case 12:
				return ScaleDegree.__7b;
			case 13:
				return ScaleDegree.__7;
			case 14:
				return ScaleDegree.__8;
			case 15:
				return ScaleDegree.__9b;
			case 16:
				return ScaleDegree.__9;
			case 17:
				return ScaleDegree.__9s;
			case 18:
				return ScaleDegree.__11;
			case 19:
				return ScaleDegree.__11s;
			case 20:
				return ScaleDegree.__13b;
			case 21:
				return ScaleDegree.__13;
			default:
				throw new Error(`The generation of 'i' on line 28 is incorrect. Review it.`);
		}
	}

	static from_keyboard_friendly_name(keyboard_friendly_name) {
		switch (keyboard_friendly_name) {
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__1):
				return ScaleDegree.__1;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__2b):
				return ScaleDegree.__2b;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__2):
				return ScaleDegree.__2;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__3b):
				return ScaleDegree.__3b;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__3):
				return ScaleDegree.__3;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__4):
				return ScaleDegree.__4;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__4s):
				return ScaleDegree.__4s;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__5b):
				return ScaleDegree.__5b;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__5):
				return ScaleDegree.__5;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__5s):
				return ScaleDegree.__5s;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__6b):
				return ScaleDegree.__6b;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__6):
				return ScaleDegree.__6;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__7b):
				return ScaleDegree.__7b;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__7):
				return ScaleDegree.__7;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__8):
				return ScaleDegree.__8;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__9b):
				return ScaleDegree.__9b;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__9):
				return ScaleDegree.__9;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__9s):
				return ScaleDegree.__9s;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__11):
				return ScaleDegree.__11;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__11s):
				return ScaleDegree.__11s;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__13b):
				return ScaleDegree.__13b;
			case ScaleDegree.keyboard_friendly_name(ScaleDegree.__13):
				return ScaleDegree.__13;
			default:
				throw new Error(`Illegal 'keyboard_friendly_name' provided.`);
		}
	}

	static is(scale_degree) {
		switch (scale_degree) {
			case ScaleDegree.__1:
			case ScaleDegree.__2b:
			case ScaleDegree.__2:
			case ScaleDegree.__3b:
			case ScaleDegree.__3:
			case ScaleDegree.__4:
			case ScaleDegree.__4s:
			case ScaleDegree.__5b:
			case ScaleDegree.__5:
			case ScaleDegree.__5s:
			case ScaleDegree.__6b:
			case ScaleDegree.__6:
			case ScaleDegree.__7b:
			case ScaleDegree.__7:
			case ScaleDegree.__8:
			case ScaleDegree.__9b:
			case ScaleDegree.__9:
			case ScaleDegree.__9s:
			case ScaleDegree.__11:
			case ScaleDegree.__11s:
			case ScaleDegree.__13b:
			case ScaleDegree.__13:
				return true;
			default:
				return false;
		}
	}

	static display_name(scale_degree) {
		switch (scale_degree) {
			case ScaleDegree.__1:
				return '1';
			case ScaleDegree.__2b:
				return `2${Character.__b}`;
			case ScaleDegree.__2:
				return '2';
			case ScaleDegree.__3b:
				return `2${Character.__b}`;
			case ScaleDegree.__3:
				return '3';
			case ScaleDegree.__4:
				return '4';
			case ScaleDegree.__4s:
				return `4${Character.__s}`;
			case ScaleDegree.__5b:
				return `5${Character.__b}`;
			case ScaleDegree.__5:
				return '5';
			case ScaleDegree.__5s:
				return `5${Character.__s}`;
			case ScaleDegree.__6b:
				return `6${Character.__b}`;
			case ScaleDegree.__6:
				return '6';
			case ScaleDegree.__7b:
				return `7${Character.__b}`;
			case ScaleDegree.__7:
				return '7';
			case ScaleDegree.__8:
				return '8';
			case ScaleDegree.__9b:
				return `9${Character.__b}`;
			case ScaleDegree.__9:
				return '9';
			case ScaleDegree.__9s:
				return `9${Character.__s}`;
			case ScaleDegree.__11:
				return '11';
			case ScaleDegree.__11s:
				return `11${Character.__s}`;
			case ScaleDegree.__13b:
				return `13${Character.__b}`;
			case ScaleDegree.__13:
				return '13';
			default:
				throw new Error(`Illegal 'scale_degree' value provided.`);
		}
	}

	static keyboard_friendly_name(scale_degree) {
		switch (scale_degree) {
			case ScaleDegree.__1:
				return '1';
			case ScaleDegree.__2b:
				return '2b';
			case ScaleDegree.__2:
				return '2';
			case ScaleDegree.__3b:
				return '3b';
			case ScaleDegree.__3:
				return '3';
			case ScaleDegree.__4:
				return '4';
			case ScaleDegree.__4s:
				return '4s';
			case ScaleDegree.__5b:
				return '5b';
			case ScaleDegree.__5:
				return '5';
			case ScaleDegree.__5s:
				return '5s';
			case ScaleDegree.__6b:
				return '6b';
			case ScaleDegree.__6:
				return '6';
			case ScaleDegree.__7b:
				return '7b';
			case ScaleDegree.__7:
				return '7';
			case ScaleDegree.__8:
				return '8';
			case ScaleDegree.__9b:
				return '9b';
			case ScaleDegree.__9:
				return '9';
			case ScaleDegree.__9s:
				return '9s';
			case ScaleDegree.__11:
				return '11';
			case ScaleDegree.__11s:
				return '11s';
			case ScaleDegree.__13b:
				return '13b';
			case ScaleDegree.__13:
				return '13';
			default:
				throw new Error(`Illegal 'scale_degree' value provided.`);
		}
	}
}
