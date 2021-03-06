const RAM = require('./ram');
const CPU = require('./cpu');
const fs = require('fs');
/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {
    let program = fs.readFileSync(process.argv[2], { encoding: 'binary' });
    while (program.includes('#')) {
        let startIndex = program.indexOf('#');
        const endIndex = program.indexOf('\n', startIndex);
        if (endIndex === -1) program = program.slice(0, startIndex);
        else program = program.slice(0, startIndex) + program.slice(endIndex);
    }
    program = program.replace(/' '/g, '').split('\n').filter(each => each !== '').map(each => each.trim());

    // Load the program into the CPU's memory a byte at a time
    for (let i = 0; i < program.length; i++) {
        cpu.poke(i, program[i]);
    }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

loadMemory(cpu);

cpu.startClock();