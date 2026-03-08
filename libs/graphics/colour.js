// libs
import { IllegalArgTypeError } from '../errors/illegal_arg_type_error.js';

export class Colour {
	static #rgb_hex_regex = /^#([0-9a-f]{2})_([0-9a-f]{2})_([0-9a-f]{2})$/
	static #rgba_hex_regex = /^#([0-9a-f]{2})_([0-9a-f]{2})_([0-9a-f]{2})_([0-9a-f]{2})$/

	#r;
	#g;
	#b;
	#a;

	constructor(r, g, b, a = 255) {
		if (!(Number.isInteger(r) && r >= 0 && r <= 255)) {
			throw new IllegalArgTypeError('r', 'Int<0..255>');
		}

		if (!(Number.isInteger(g) && g >= 0 && g <= 255)) {
			throw new IllegalArgTypeError('g', 'Int<0..255>');
		}

		if (!(Number.isInteger(b) && b >= 0 && b <= 255)) {
			throw new IllegalArgTypeError('b', 'Int<0..255>');
		}

		if (!(Number.isInteger(a) && a >= 0 && a <= 255)) {
			throw new IllegalArgTypeError('a', 'Int<0..255>');
		}

		this.#r = r;
		this.#g = g;
		this.#b = b;
		this.#a = a;
	}

	static from_rgb_hex(rgb_hex) {
		if (!(typeof rgb_hex === 'string' && Colour.#rgb_hex_regex.test(rgb_hex))) {
			throw new IllegalArgTypeError('rgb_hex', 'String<#rr_gg_bb>');
		}

		let [_, r, g, b] = rgb_hex.match(Colour.#rgb_hex_regex);

		r = parseInt(r, 16);
		g = parseInt(g, 16);
		b = parseInt(b, 16);

		return new Colour(r, g, b);
	}

	static from_rgba_hex(rgba_hex) {
		if (!(typeof rgba_hex === 'string' && Colour.#rgba_hex_regex.test(rgba_hex))) {
			throw new IllegalArgTypeError('rgb_hex', 'String<#rr_gg_bb_aa>');
		}

		let [_, r, g, b, a] = rgba_hex.match(Colour.#rgba_hex_regex);

		r = parseInt(r, 16);
		g = parseInt(r, 16);
		b = parseInt(r, 16);
		a = parseInt(r, 16);

		return new Colour(r, g, b, a);
	}

	get r() {
		return this.#r;
	}

	get g() {
		return this.#g;
	}

	get b() {
		return this.#b;
	}

	get a() {
		return this.#a;
	}

	get rgb() {
		return [this.r, this.g, this.b];
	}

	get rgba() {
		return [this.r, this.g, this.b, this.a]
	}

	get hex() {
		return `#${((this.a === 255) ? this.rgb : this.rgba).map(colour => colour.toString(16).toUpperCase().padStart(2, '0')).join('_')}`;
	}

	get css_hex() {
		return `#${((this.a === 255) ? this.rgb : this.rgba).map(colour => colour.toString(16).toUpperCase().padStart(2, '0')).join('')}`;
	}

	type_info() {
		return `Colour(${this.hex})`;
	}

	is_equal_to(other) {
		if (!(other instanceof Colour)) {
			return false;
		}

		if (!(this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a)) {
			return false;
		}

		return true;
	}
}
