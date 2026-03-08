// libs
import { ANSI } from './ansi.js';
import { Colour } from '../colour.js';

export class ANSI_Palette {
	static focal_point = new ANSI().bold().colour(Colour.from_rgb_hex('#ff_c1_45')); // yellow

	static verb = new ANSI().bold().italic().colour(Colour.from_rgb_hex('#ce_17_88')); // pink
	
	static noun = new ANSI().bold().colour(Colour.from_rgb_hex('#21_34_e7')); // blue

	static ancillary = new ANSI().italic().dim().colour(Colour.from_rgb_hex('#90_71_71')); // grey
	
	static good = new ANSI().bold().colour(Colour.from_rgb_hex('#81_ce_5e')); // green
	
	static bad = new ANSI().bold().colour(Colour.from_rgb_hex('#ec_37_37')); // red
}
