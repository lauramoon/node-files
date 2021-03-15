const fs = require('fs');
const axios = require('axios');
const argv = process.argv;
let localFile;
let toConsole;
let readFileOrURL;
let writeFile;

function cat(path) {

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`);
            console.error("  " + err);
            process.exit(1);
        }
        if (toConsole) {
            console.log(data);
        } else {
            saveData(data)
        }
      });
}

async function webCat(url) {
    try {
        res = await axios.get(url);
        if (toConsole) {
            console.log(res.data);
        } else {
            saveData(res.data);
        }
    } catch (err) {
        console.log(`Error fetching ${url}:`);
        console.log("  " + err);
    }
}

function saveData(data) {
    fs.writeFile(writeFile, data, "utf8", function(err) {
        if (err) {
            console.log(`Error writing to ${writeFile}:`);
            console.error("  " + err);
            process.exit(1);
        }
        const message = localFile ? 'contents of' : 'HTML from';
        console.log(`# no output, but ${writeFile} contains ${message} ${readFileOrURL}`);
    });
}

// check if printing to file or console, assign args to variables
if (argv[2] === '--out') {
    toConsole = false;
    writeFile = argv[3];
    readFileOrURL = argv[4];
} else {
    readFileOrURL = argv[2];
}

// check if dealing with filepath or URL, call function
if (readFileOrURL.slice(0,4).toLowerCase() === 'http') {
    webCat(readFileOrURL);
} else {
    cat(readFileOrURL);
}
