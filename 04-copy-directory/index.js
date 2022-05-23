const fs = require('fs')
const path = require('path')

fs.promises.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: true }
);

fs.promises.readdir(path.join(__dirname, 'files-copy'))
    .then(filenames => {
        for (let filename of filenames) {
            fs.unlink(path.join(__dirname, 'files-copy', `${filename}`),
                (err => {
                    if (err) console.log(err);
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
    (error, files) => {
        if (error) throw error;
        files.forEach(file => {
            fs.promises.copyFile(
                path.join(__dirname, 'files', `${file.name}`),
                path.join(__dirname, 'files-copy', `${file.name}`),
            )
        })
    }
)
