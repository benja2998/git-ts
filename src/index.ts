#!/usr/bin/env node

const { exec } = require('child_process');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log('Simple Git Commit TUI\n');

rl.question('Enter commit message: ', (message: string) => {
	if (!message.trim()) {
		console.log('Commit message cannot be empty.');
		rl.close();
		return;
	}

	// Stage all changes and commit
	exec(`git add . && git commit -m "${message}"`, (error: Error, stdout: string, stderr: string) => {
		if (error) {
			console.error(`Error: ${error.message}`);
		} else if (stderr) {
			console.error(`Git error: ${stderr}`);
		} else {
			console.log(stdout);
		}
		rl.close();
	});
});
