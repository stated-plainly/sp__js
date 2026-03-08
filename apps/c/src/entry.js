#!/usr/bin/env node

// libs
import { EventBus } from '../../../libs/singletons/event_bus.js';
// local
import { enter } from './functions/enter.js';
import { exit } from './functions/exit.js';

EventBus
	.add('enter', enter)
	.add('exit', exit)
	.trigger('enter');
