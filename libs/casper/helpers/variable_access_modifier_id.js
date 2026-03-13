export class VariableAccessModifierID {
	static __immut = Symbol();
	static __inmut = Symbol();
	static __exmut = Symbol();
	static __mut = Symbol();

	static as_list() {
		return [
			VariableAccessModifierID.__immut,
			VariableAccessModifierID.__inmut,
			VariableAccessModifierID.__exmut,
			VariableAccessModifierID.__mut,
		];
	}
}
