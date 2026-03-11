#!/usr/bin/env node
import { ANSI_Palette } from '../../../libs/graphics/ansi/ansi_palette.js';

import { build } from './commands/build.js';
import { run } from './commands/run.js';

switch (process.argv.length) {
    case 3:
        process_command(process.argv[2]);
        break;
    default:
        print_help();
}

function process_command(command) {
    switch (command) {
        case 'build':
			build();
            break;
        case 'run':
			run();
            break;
        default:
            print_help();
    }
}

function print_help() {
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
