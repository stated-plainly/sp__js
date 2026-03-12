#!/usr/bin/env node

// lib
import { EventBus } from '../../../libs/events/event_bus.js';
// local
import { enter } from './functions/enter.js';
import { exit } from './functions/exit.js';
import { main } from './functions/main.js';

EventBus
	.add('enter', enter)
	.add('main', main)
	.add('exit', exit)
	.trigger('enter');
