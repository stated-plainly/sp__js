// libs
import { ANSI_Palette } from '../../../../libs/graphics/ansi/ansi_palette.js';
import { EventBus } from '../../../../libs/events/event_bus.js';
import { Note } from '../../../../libs/music/note.js';
import { ScaleDegree } from '../../../../libs/music/scale_degree.js';
// local
import { Global } from '../singletons/global.js';
import { Perspective } from '../enums/perspective.js';

const correct_text = ANSI_Palette.good.apply_to('Correct');
const incorrect_text = ANSI_Palette.bad.apply_to('Incorrect');

export function main() {
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

	function root_of(root_note, relative_note, scale_degree) {
		Global.rl.question(`What is ${ANSI_Palette.noun.apply_to(relative_note.display_name)} the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of? ${ANSI_Palette.ancillary.apply_to(`(or hit 'q' to quit)`)} `, answer => {
			if (answer === 'q') {
				EventBus.trigger('exit');
			}

			const start = (answer === root_note.keyboard_friendly_name) ? correct_text : incorrect_text;

			console.clear();
			console.log(`${start}! ${ANSI_Palette.noun.apply_to(relative_note.display_name)} is the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of ${ANSI_Palette.focal_point.apply_to(root_note.display_name)}.`)
			console.log();

			EventBus.trigger('main');
		});
	}

	function scale_degree_of(root_note, relative_note, scale_degree) {
		Global.rl.question(`What is the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of ${ANSI_Palette.noun.apply_to(root_note.display_name)}? ${ANSI_Palette.ancillary.apply_to(`(or hit 'q' to quit)`)} `, answer => {
			if (answer === 'q') {
				EventBus.trigger('exit');
			}

			const start = (answer === relative_note.keyboard_friendly_name) ? correct_text : incorrect_text;

			console.clear();
			console.log(`${start}! ${ANSI_Palette.focal_point.apply_to(relative_note.display_name)} is the ${ANSI_Palette.verb.apply_to(ScaleDegree.display_name(scale_degree))} of ${ANSI_Palette.noun.apply_to(root_note.display_name)}.`)
			console.log();
			
			EventBus.trigger('main');
		});
	}
}
