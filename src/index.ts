const { spawn } = require("child_process");  
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

function pipeToLess(args: string[]) {
    const git = spawn("git", args, { stdio: ["ignore", "pipe", "pipe"] });
    const less = spawn("less", ["-R"], { stdio: ["pipe", process.stdout, process.stderr] });

    // Pipe git stdout/stderr to less
    git.stdout.pipe(less.stdin);
    git.stderr.pipe(less.stdin);

    less.on("close", () => {
        console.clear(); // clear the screen after exiting less
        showMenu();
    });
}

function showMenu() {
    console.clear();
    process.stdout.write(`${colors.bold}git-ts menu${colors.reset}\n\n` +  
        `${colors.bold}a${colors.reset} - ${colors.bold}${colors.blue}add all files${colors.reset}\n` +  
        `${colors.bold}c${colors.reset} - ${colors.bold}${colors.blue}commit with message${colors.reset}\n` +  
        `${colors.bold}C${colors.reset} - ${colors.bold}${colors.blue}commit with message and sign-off${colors.reset}\n` +  
        `${colors.bold}p${colors.reset} - ${colors.bold}${colors.blue}pull${colors.reset}\n` +  
        `${colors.bold}P${colors.reset} - ${colors.bold}${colors.blue}push${colors.reset}\n` +  
        `${colors.bold}f${colors.reset} - ${colors.bold}${colors.blue}fetch${colors.reset}\n` +  
        `${colors.bold}s${colors.reset} - ${colors.bold}${colors.blue}status${colors.reset}\n` +  
        `${colors.bold}l${colors.reset} - ${colors.bold}${colors.blue}log${colors.reset}\n` +
	`${colors.bold}d${colors.reset} - ${colors.bold}${colors.blue}diff${colors.reset}\n` +
	`${colors.bold}!${colors.reset} - ${colors.bold}${colors.blue}run git command${colors.reset}\n` +
        `${colors.bold}q${colors.reset} - ${colors.bold}${colors.blue}quit${colors.reset}\n\n`  
			);  

    rl.question(`${colors.bold}option:${colors.reset} `, (key: string) => {  
        switch (key.trim()) {  
            case "a":  
                spawn("git", ["add", "-A"], { stdio: "inherit" }).on("close", showMenu);
                break;  
            case "c":  
                rl.question("message: ", (msg: string) => {  
		    pipeToLess(["commit", "-m", msg]);
                });
                break;  
            case "C":  
                rl.question("message: ", (msg: string) => {  
		    pipeToLess(["commit", "-sm", msg]); 
                });
                break;  
            case "p":
		pipeToLess(["pull", "--rebase"]);
                break;  
            case "P":  
		pipeToLess(["push"]);
                break;  
            case "f":  
		pipeToLess(["fetch"]);
                break;
            case "s":  
                pipeToLess(["status"]);
                break;  
            case "l":  
                pipeToLess(["log", "--decorate", "--graph", "--color=always"]);  
                break;  
            case "d":  
                pipeToLess(["diff", "HEAD", "--color=always"]);  
                break;
	    case "!":
		rl.question("git command (e.g., show HEAD): ", (cmd: string) => {
		    const args = cmd
			.trim()
			.split(/\s+/)
			.filter(Boolean);

		    if (args.length === 0) {
			showMenu();
			return;
		    }

		    pipeToLess(args);
		});
		break;
            case "q":  
                rl.close();  
                break;
            default:  
                showMenu();  
        }  
    });  
}  

showMenu();
