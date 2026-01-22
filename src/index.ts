const { exec, spawn } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
	white: "\x1b[37m",
	bold: "\x1b[1m",
};

process.stdout.write(`${colors.bold}git-ts menu${colors.reset}\n\n` +
	`${colors.bold}a${colors.reset} - ${colors.bold}${colors.blue}add all files${colors.reset}\n` +
	`${colors.bold}c${colors.reset} - ${colors.bold}${colors.blue}commit with message${colors.reset}\n` +
	`${colors.bold}C${colors.reset} - ${colors.bold}${colors.blue}commit with message and with sign-off${colors.reset}\n` +
	`${colors.bold}p${colors.reset} - ${colors.bold}${colors.blue}pull${colors.reset}\n` +
	`${colors.bold}P${colors.reset} - ${colors.bold}${colors.blue}push${colors.reset}\n` +
	`${colors.bold}f${colors.reset} - ${colors.bold}${colors.blue}fetch${colors.reset}\n` +
	`${colors.bold}s${colors.reset} - ${colors.bold}${colors.blue}status${colors.reset}\n` +
	`${colors.bold}l${colors.reset} - ${colors.bold}${colors.blue}log${colors.reset}\n` +
	`${colors.bold}d${colors.reset} - ${colors.bold}${colors.blue}diff${colors.reset}\n` +
	`${colors.bold}q${colors.reset} - ${colors.bold}${colors.blue}quit${colors.reset}\n\n`
					);

rl.question(`${colors.bold}option:${colors.reset} `, (key: string) => {
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
		case "l":
			process.stdout.write("-- oldest --\n");
			const child2 = spawn("git", ["log", "--reverse", "--decorate", "--color=always"]);
			child2.stdout.on("data", (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			child2.stderr.on("data", (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			child2.on("close", (_code: number) => {
				process.stdout.write("-- newest --\n");
			});
			rl.close();
			break;
		case "s":
			const child = spawn("git", ["status", "--short"]);
			child.stdout.on("data", (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			child.stderr.on("data", (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			rl.close();
			break;
		case "d":
			const child3 = spawn("git", ["-p", "diff", "HEAD", "--color=always"]);
			child3.stdout.on("data", (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			child3.stdout.on("data", (data: string | Uint8Array<ArrayBufferLike>) => {
				process.stdout.write(data);
			});
			child3.on("close", (_code: number) => {
				process.stdout.write("Scroll up to see output\n");
			});
			rl.close();
			break;
		case "q":
			rl.close();
	}
});
