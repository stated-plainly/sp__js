export class PrimitiveID {
	// bit
	static __bit = Symbol();
	// b{size}
	static __b8 = Symbol();
	static __b16 = Symbol();
	static __b32 = Symbol();
	static __b64 = Symbol();
	static __b128 = Symbol();
	// h{size}
	static __h8 = Symbol();
	static __h16 = Symbol();
	static __h32 = Symbol();
	static __h64 = Symbol();
	static __h128 = Symbol();
	// u{size}
	static __u8 = Symbol();
	static __u16 = Symbol();
	static __u32 = Symbol();
	static __u64 = Symbol();
	static __u128 = Symbol();

	static as_list() {
		return [
			// bit
			PrimitiveID.__bit,
			// b{size}
			PrimitiveID.__b8,
			PrimitiveID.__b16,
			PrimitiveID.__b32,
			PrimitiveID.__b64,
			PrimitiveID.__b128,
			// h{size}
			PrimitiveID.__h8,
			PrimitiveID.__h16,
			PrimitiveID.__h32,
			PrimitiveID.__h64,
			PrimitiveID.__h128,
			// u{size}
			PrimitiveID.__u8,
			PrimitiveID.__u16,
			PrimitiveID.__u32,
			PrimitiveID.__u64,
			PrimitiveID.__u128,
		];
	}
}
