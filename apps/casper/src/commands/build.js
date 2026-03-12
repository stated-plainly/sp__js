// builtin
import { exec } from 'child_process';
import fs from 'fs';
import { readFile } from 'fs/promises';
// libs
import { ANSI_Palette } from '../../../../libs/graphics/ansi/ansi_palette.js';
import { EventBus } from '../../../../libs/events/event_bus.js';
import { InterLang } from '../../../../libs/inter_lang/inter_lang.js';
import { UserError } from '../../../../libs/errors/user_error.js';
import { lexer } from '../../../../libs/casper/lexer/lexer.js';
import { CheckType } from '../../../../libs/types/check_type.js';

export async function build() {
	let config_il_text;

	try {
		config_il_text = await readFile(`${process.cwd()}/config.il`, {encoding: 'utf-8'});
	} catch (err) {
		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('casper')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} No ${ANSI_Palette.focal_point.apply_to('config.il')} file found in current working directory.`});
	}

	let config;

	try {
		config = InterLang.parse(config_il_text);
	} catch (err) {
		if (CheckType.is_type(err, UserError)) {
			EventBus.trigger('exit', {error_message: err.message});
		}
	}

	if (!CheckType.object_has_key(config, 'entry')) {
		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('casper')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} No ${ANSI_Palette.focal_point.apply_to('entry')} key present in ${ANSI_Palette.verb.apply_to('config.il')}.`});
	}

	const out_dir = `${process.cwd()}\\out`;

	fs.access(out_dir, err => {
		if (err) {
			fs.mkdir(out_dir, err => {});
		}
	});

	let c_entry_file_text;

	try {
		c_entry_file_text = await readFile(`${process.cwd()}/in/${config.entry}.gh`, {encoding: 'utf-8'});
	} catch (err) {
		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('casper')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} Failed to read ${ANSI_Palette.focal_point.apply_to(`./in/${config.entry}.gh`)}.`});
	}

	for (const token of lexer.tokenise(c_entry_file_text)) {
		console.log(token.type_info);
	}

	// exec(`gcc ${process.cwd()}\\out\\${config.entry}.s -o ${process.cwd()}\\out\\${config.entry}.exe`, (err, stdout, stderr) => {
	// 	if (err) {
	// 		console.error(err);
	// 		EventBus.trigger('exit', {error_message: `${ANSI_Palette.focal_point.apply_to('C')} ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.verb.apply_to('build')} Error ${ANSI_Palette.ancillary.apply_to('::')} ${ANSI_Palette.noun.apply_to('gcc')} failed to convert ${ANSI_Palette.focal_point.apply_to(`${config.entry}.c`)} into a preprocessed file.`});
	// 	}
	// });
}
