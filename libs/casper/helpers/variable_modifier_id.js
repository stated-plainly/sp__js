export class VariableModifierID {
	static __immut = Symbol();
	static __inmut = Symbol();
	static __exmut = Symbol();
	static __mut = Symbol();

	static as_list() {
		return [
			VariableModifierID.__immut,
			VariableModifierID.__inmut,
			VariableModifierID.__exmut,
			VariableModifierID.__mut,
		];
	}
}
