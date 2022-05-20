const fs = require('fs')
const fsPromises = fs.promises;
const path = require('path')

fsPromises.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: true }
);


fs.promises.readdir(path.join(__dirname, 'files-copy'))
    .then(filenames => {
        for (let filename of filenames) {
            fs.unlink(path.join(__dirname, 'files-copy', `${filename}`),
                (err => {
                    if (err) console.log(err);
                    else {
                    }
                }
                )
            )
        }
    })
    .catch(err => {
        console.log(err)
    })


fs.readdir(
    path.join(__dirname, 'files'),
    { withFileTypes: true },
    (err, files) => {
        files.forEach(file => {
            fsPromises.copyFile(
                path.join(__dirname, 'files', `${file.name}`),
                path.join(__dirname, 'files-copy', `${file.name}`),
            )
        })
    }
)
