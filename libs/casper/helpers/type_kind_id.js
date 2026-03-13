export class TypeKindID {
	static __primitive = Symbol();
	static __object = Symbol();
	static __enum = Symbol();
	static __interface = Symbol();
	static __callback = Symbol();

	static as_list() {
		return [
			TypeKindID.__primitive,
			TypeKindID.__object,
			TypeKindID.__enum,
			TypeKindID.__interface,
			TypeKindID.__callback,
		];
	}
}
