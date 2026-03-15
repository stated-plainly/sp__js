#!/usr/bin/env node

// libs
import { EventBus } from '../../../libs/events/event_bus.js';
// local
import { enter } from './events/enter.js';
import { exit } from './events/exit.js';

EventBus
	.add('enter', enter)
	.add('exit', exit)
	.trigger('enter');
