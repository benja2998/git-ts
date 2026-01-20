#!/usr/bin/env node

const { exec } = require("child_process");
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
			exec("git status --porcelain", (err: string, stdout: string) => {
				if (err) {
					return;
				}

				const lines = stdout.split("\n").filter(Boolean);
				const parsed = lines.map(line => {
					const [x, y] = [line[0], line[1]];
					const path = line.slice(3).trim();
					let status = "";

					// staged changes
					if (x === "M") {
						status = "staged modification";
					} else if (x === "A") {
						status = "staged addition";
					} else if (x === "D") {
						status = "staged deletion";
					} else if (x === "R") {
						status = "staged rename";
					} else if (x === "C") {
						status = "staged copy";
					} else if (x === "U") {
						status = "unmerged (conflict)";
					}

					// unstaged changes
					if (y === "M") {
						status = "modified";
					} else if (y === "D") {
						status = "deleted";
					} else if (y === "?") {
						status = "untracked";
					} else if (y === "!") {
						status = "ignored";
					}

					return { path, status };
				});

				console.log(parsed);
			});
			break;
	}
});
