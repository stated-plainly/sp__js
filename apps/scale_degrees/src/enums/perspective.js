export class Perspective {
	static __root_of = Symbol();
	static __scale_degree_of = Symbol();

	static random() {
		const i = Math.floor(Math.random() * 2);

		switch (i) {
			case 0:
				return Perspective.__root_of;
			case 1:
				return Perspective.__scale_degree_of;
			default:
				throw new Error(`'i' generation logic on line 19 is incorrect. 'i' should be in the range of 0..2.`);
		}
	}
}
