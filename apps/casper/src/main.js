#!/usr/bin/env node
// libs
import { EventBus } from '../../../libs/singletons/event_bus.js';
// local
import { enter } from './event_handlers/enter.js';
import { exit } from './event_handlers/exit.js';

EventBus
	.add('enter', enter)
	.add('exit', exit)
	.trigger('enter');
