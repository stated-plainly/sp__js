import { Global } from '../singletons/global.js';

export function exit() {
	Global.rl.close();
	console.clear();
	process.exit();
}
