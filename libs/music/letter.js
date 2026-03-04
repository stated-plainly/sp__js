export class Letter {
	static __c = Symbol();
	static __d = Symbol();
	static __e = Symbol();
	static __f = Symbol();
	static __g = Symbol();
	static __a = Symbol();
	static __b = Symbol();

	static is(letter) {
		switch (letter) {
			case Letter.__c:
			case Letter.__d:
			case Letter.__e:
			case Letter.__f:
			case Letter.__g:
			case Letter.__a:
			case Letter.__b:
				return true;
			default:
				return false;
		}
	}

	static display_name(letter) {
		switch (letter) {
			case Letter.__c:
				return 'C';
			case Letter.__d:
				return 'D';
			case Letter.__e:
				return 'E';
			case Letter.__f:
				return 'F';
			case Letter.__g:
				return 'G';
			case Letter.__a:
				return 'A';
			case Letter.__b:
				return 'B';
			default:
				throw new Error(`Illegal 'letter' value provided.`);
		}
	}

	static keyboard_friendly_name(letter) {
		switch (letter) {
			case Letter.__c:
				return 'c';
			case Letter.__d:
				return 'd';
			case Letter.__e:
				return 'e';
			case Letter.__f:
				return 'f';
			case Letter.__g:
				return 'g';
			case Letter.__a:
				return 'a';
			case Letter.__b:
				return 'b';
			default:
				throw new Error(`Illegal 'letter' value provided.`);
		}
	}
}
