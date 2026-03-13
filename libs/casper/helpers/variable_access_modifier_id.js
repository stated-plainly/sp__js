export class VariableAccessModifierID {
	static __immut = Symbol();
	static __mut = Symbol();
	static __mut_in = Symbol();
	static __mut_ex = Symbol();

	static as_list() {
		return [
			VariableAccessModifierID.__immut,
			VariableAccessModifierID.__mut,
			VariableAccessModifierID.__mut_in,
			VariableAccessModifierID.__mut_ex,
		];
	}
}
