const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path) {

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}:`);
            console.error("  " + err);
            process.exit(1);
        }
        console.log(`${data}`);
      });
}

async function webCat(url) {
    try {
        res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log(`Error fetching ${url}:`);
        console.log("  " + err);
    }
}

if (argv[2].slice(0,4).toLowerCase() === 'http') {
    webCat(argv[2]);
} else {
    cat(argv[2]);
}
