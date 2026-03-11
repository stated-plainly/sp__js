// libs
import { ANSI_Palette } from '../../../../libs/graphics/ansi/ansi_palette.js';

export function print_help() {
	console.log();
	console.log(ANSI_Palette.ancillary.apply_to('----------------------------------------------'));
	console.log(` ${ANSI_Palette.focal_point.apply_to('casper')} ${ANSI_Palette.ancillary.apply_to('(compiler)')}`);
	console.log(ANSI_Palette.ancillary.apply_to('----------------------------------------------'));
	console.log();
	console.log(` commands${ANSI_Palette.ancillary.apply_to(':')}`);
	console.log();
	console.log(`     ${ANSI_Palette.focal_point.apply_to('build')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} your casper app`);
	console.log(`       ${ANSI_Palette.focal_point.apply_to('run')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')}, then ${ANSI_Palette.verb.apply_to('run')} your casper app`);
	console.log();
	console.log(ANSI_Palette.ancillary.apply_to('----------------------------------------------'));
}
