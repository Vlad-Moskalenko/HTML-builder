const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, files) => {
        files.forEach(file => {
            if (
                path.extname(`${file.name}`) == '.css'
            ) {
                fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`)).on('data', data => output.write(data + '\n'))
            }
        })

    }
)