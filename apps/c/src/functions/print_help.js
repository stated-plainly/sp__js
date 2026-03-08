// libs
import { ANSI_Palette } from '../../../../libs/graphics/ansi/ansi_palette.js';

export function print_help() {
	console.clear();
	console.log(`${ANSI_Palette.ancillary.apply_to('----------------------------------------------')}`);
	console.log(` ${ANSI_Palette.focal_point.apply_to('C')}`);
	console.log(`${ANSI_Palette.ancillary.apply_to('----------------------------------------------')}`);
	console.log();
	console.log(`    ${ANSI_Palette.verb.apply_to('build')} ${ANSI_Palette.ancillary.apply_to('=>')} Builds your C project`);
	console.log(`      ${ANSI_Palette.verb.apply_to('run')} ${ANSI_Palette.ancillary.apply_to('=>')} Builds, then runs your C project`);
	console.log();
	console.log(`${ANSI_Palette.ancillary.apply_to('----------------------------------------------')}`);
}
