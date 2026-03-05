#!/usr/bin/env node

import readline from 'readline';

import { ANSI_Palette } from '../../../libs/graphics/ansi.js';
import { ScaleDegree } from '../../../libs/music/scale_degree.js';
import { Note } from '../../../libs/music/note.js';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

class Perspective {
	static __root_of = Symbol();
	static __scale_degree_of = Symbol();

	static random() {
		const i = Math.floor(Math.random() * 2);

		switch (i) {
			case 0:
				return Perspective.__root_of;
			case 1:
				return Perspective.__scale_degree_of;
			default:
				throw new Error(`'i' generation logic on line 19 is incorrect. 'i' should be in the range of 0..2.`);
		}
	}
}

main();

function main() {
	let scale_degree;

	if (process.argv.length === 3) {
		try {
			scale_degree = ScaleDegree.from_keyboard_friendly_name(process.argv[2]);
		} catch (err) {
			scale_degree = ScaleDegree.random();
		}
	} else {
		scale_degree = ScaleDegree.random();
	}

	const root_note = Note.random_diatonic_root();
	const relative_note = root_note.note_at(scale_degree);

	const perspective = Perspective.random();

	switch (perspective) {
		case Perspective.__root_of:
			root_of(root_note, relative_note, scale_degree);
			break;
		case Perspective.__scale_degree_of:
			scale_degree_of(root_note, relative_note, scale_degree);
			break;
	}
}


function root_of(root_note, relative_note, scale_degree) {
	rl.question(`What is ${ANSI_Palette.noun.apply_to(relative_note.display_name)} the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of? ${ANSI_Palette.ancillary.apply_to(`(or hit 'q' to quit)`)} `, answer => {
		if (answer === 'q') {
			exit();
		}

		const start = (answer === root_note.keyboard_friendly_name) ? ANSI_Palette.good.apply_to('Correct') : ANSI_Palette.bad.apply_to('Incorrect');

		console.log(`${start}! ${ANSI_Palette.noun.apply_to(relative_note.display_name)} is the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of ${ANSI_Palette.focal_point.apply_to(root_note.display_name)}.`)
		console.log();

		main();
	});

}

function scale_degree_of(root_note, relative_note, scale_degree) {
	rl.question(`What is the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of ${ANSI_Palette.noun.apply_to(root_note.display_name)}? ${ANSI_Palette.ancillary.apply_to(`(or hit 'q' to quit)`)} `, answer => {
		if (answer === 'q') {
			exit();
		}

		const start = (answer === relative_note.keyboard_friendly_name) ? ANSI_Palette.good.apply_to('Correct') : ANSI_Palette.bad.apply_to('Incorrect');

		console.log(`${start}! ${ANSI_Palette.focal_point.apply_to(relative_note.display_name)} is the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of ${ANSI_Palette.noun.apply_to(root_note.display_name)}.`)
		console.log();
		
		main();
	});
}

function exit() {
	rl.close();
	process.exit();
}
