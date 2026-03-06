#!/usr/bin/env node

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
            break;
        case 'run':
            break;
        default:
            print_help();
    }
}

function print_help() {

}
