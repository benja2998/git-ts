#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const shebang = "#!/usr/bin/env node\n";

const files = [
    path.join(__dirname, "../dist/index.js"),
]

files.forEach(file => {
    if (!fs.existsSync(file)) {
	console.warn(`File not found: ${file}`);
	return;
    }

    const content = fs.readFileSync(file, 'utf8');

    // Only add shebang if it doesn't already exist
    if (!content.startsWith('#!')) {
	fs.writeFileSync(file, shebang + content, 'utf8');
	console.log(`Shebang added to ${file}`);
    } else {
	console.log(`Shebang already exists in ${file}`);
    }
});
