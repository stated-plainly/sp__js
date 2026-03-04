import { Symbol } from './symbol.js';

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

	static display_name(scale_degree) {
		switch (scale_degree) {
			case ScaleDegree.__1:
				return '1';
			case ScaleDegree.__2b:
				return `2${Symbol.__b}`;
			case ScaleDegree.__2:
				return '2';
			case ScaleDegree.__3b:
				return `2${Symbol.__b}`;
			case ScaleDegree.__3:
				return '3';
			case ScaleDegree.__4:
				return '4';
			case ScaleDegree.__4s:
				return `4${Symbol.__s}`;
			case ScaleDegree.__5b:
				return `5${Symbol.__b}`;
			case ScaleDegree.__5:
				return '5';
			case ScaleDegree.__5s:
				return `5${Symbol.__s}`;
			case ScaleDegree.__6b:
				return `6${Symbol.__b}`;
			case ScaleDegree.__6:
				return '6';
			case ScaleDegree.__7b:
				return `7${Symbol.__b}`;
			case ScaleDegree.__7:
				return '7';
			case ScaleDegree.__8:
				return '8';
			case ScaleDegree.__9b:
				return `9${Symbol.__b}`;
			case ScaleDegree.__9:
				return '9';
			case ScaleDegree.__9s:
				return `9${Symbol.__s}`;
			case ScaleDegree.__11:
				return '11';
			case ScaleDegree.__11s:
				return `11${Symbol.__s}`;
			case ScaleDegree.__13b:
				return `13${Symbol.__b}`;
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
