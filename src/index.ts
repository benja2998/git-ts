#!/usr/bin/env node

const { exec, spawn } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

process.stdout.write("git-ts menu\n\na - add all files\nc - commit with message\nC - commit with message and with sign-off\np - pull\nP - push\nf - fetch\ns - status\nl - log\n\n");

rl.question("option: ", (key: string) => {
	switch (key.trim()) {
		case "a":
			exec("git add -A");
			rl.close();
			break;
		case "c":
			rl.question("message: ", (msg: string) => {
				exec("git commit -m \"" + msg + "\"");
				rl.close();
			});
			break;
		case "C":
			rl.question("message: ", (msg: string) => {
				exec("git commit -sm \"" + msg + "\"");
				rl.close();
			});
			break;
		case "p":
			exec("git pull --rebase");
			rl.close();
			break;
		case "P":
			exec("git push");
			rl.close();
			break;
		case "f":
			exec("git fetch");
			rl.close();
			break;
		case "s":
			const child = spawn("git", ["status", "--short"]);
			child.stdout.on('data', (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			child.stderr.on('data', (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			rl.close();
			break;
	}
});
