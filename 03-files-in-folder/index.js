const path = require('path');
const fs = require('fs');


fs.readdir(
    path.join(__dirname, 'secret-folder'),
    { withFileTypes: true },
    (err, files) => {
        if (err) {
            console.log(err);
        }
        else {
            files.forEach(file => {
                if (file.isFile()) {
                    let fileName = file.name.split('.');
                    let extName = path.extname(file.name).slice(1);
                    fs.stat(path.join(__dirname, 'secret-folder', `${file.name}`), function (err, stats) { console.log(fileName[0] + '-' + extName + '-' + stats.size / 1024 + 'kb') })
                }
            })
        }
    }
)