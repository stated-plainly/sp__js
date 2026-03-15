// builtin
import { exec } from 'child_process';
import fs from 'fs';
import { readFile } from 'fs/promises';
// libs
import { ANSI_Palette } from '../../../../libs/graphics/ansi/ansi_palette.js';
import { EventBus } from '../../../../libs/events/event_bus.js';
import { InterLang } from '../../../../libs/inter_lang/inter_lang.js';
import { UserError } from '../../../../libs/errors/user_error.js';

import { CParser } from '../../../../libs/c/parser/c_parser.js';
import { c_lexer } from '../../../../libs/c/lexer/c_lexer.js';

export async function build() {
	let config_il_text;

	try {
		config_il_text = await readFile(`${process.cwd()}/config.il`, {encoding: 'utf-8'});
	} catch (err) {
		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('C')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} No ${ANSI_Palette.focal_point.apply_to('config.il')} file found in current working directory.`});
	}

	let config;

	try {
		config = InterLang.parse(config_il_text);
	} catch (err) {
		if (err instanceof UserError) {
			EventBus.trigger('exit', {error_message: err.message});
		}
	}

	if (!('entry' in config)) {
		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('C')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} No ${ANSI_Palette.focal_point.apply_to('entry')} key present in ${ANSI_Palette.verb.apply_to('config.il')}.`});
	}

	const out_dir = `${process.cwd()}\\out`;

	fs.access(out_dir, err => {
		if (err) {
			fs.mkdir(out_dir, err => {});
		}
	});

	exec(`gcc -E -P ${process.cwd()}\\in\\${config.entry}.c -o ${process.cwd()}\\out\\${config.entry}.i`, (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('C')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.noun.apply_to('gcc')} failed to convert ${ANSI_Palette.focal_point.apply_to(`${config.entry}.c`)} into a preprocessed file.`});
		}
	});

	let c_entry_file_text;

	try {
		c_entry_file_text = await readFile(`${process.cwd()}/out/${config.entry}.i`, {encoding: 'utf-8'});
	} catch (err) {
		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('C')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} Failed to read ${ANSI_Palette.focal_point.apply_to(`./out/${config.entry}.i`)}.`});
	}

	console.log(CParser.parse(c_lexer.tokenise(c_entry_file_text, true)).type_info());	

	// exec(`gcc ${process.cwd()}\\out\\${config.entry}.s -o ${process.cwd()}\\out\\${config.entry}.exe`, (err, stdout, stderr) => {
	// 	if (err) {
	// 		console.error(err);
	// 		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('C')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.noun.apply_to('gcc')} failed to convert ${ANSI_Palette.focal_point.apply_to(`${config.entry}.c`)} into a preprocessed file.`});
	// 	}
	// });
}
