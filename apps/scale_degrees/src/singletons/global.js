import readline from 'readline';

export class Global {
	static rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
}
