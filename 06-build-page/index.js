const fs = require('fs');
const path = require('path');


(async () => {
    fs.mkdir(
        path.join(__dirname, 'project-dist'),
        { recursive: true },
        (err) => {
            if (err) {
                return console.error(err);
            }
        }
    );

    let out = ''
    await fs.promises.readFile(path.join(__dirname, 'template.html')).then(data => out = data.toString());

    let filesHTML = await fs.promises.readdir(path.join(__dirname, 'components'));

    for (let i = 0; i < filesHTML.length; i++) {
        const readFileHTML = await fs.promises.readFile(path.join(__dirname, 'components', `${filesHTML[i]}`))
        fileName = filesHTML[i].split('.')
        out = out.replace("{{" + `${fileName[0]}` + '}}', readFileHTML);
    }
    fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(out)

    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
        if (error) throw error;
        let outputCss = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
        files.forEach(file => {
            if (
                path.extname(`${file.name}`) == '.css'
            ) {
                fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`)).on('data', data => outputCss.write(data + '\n\n'))
            }
        })
    }
    )

    fs.readdir(path.join(__dirname, 'assets'), (error, dirs) => {
        if (error) throw error;
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (error) => { if (error) throw error; })
        dirs.forEach(dir => {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${dir}`), { recursive: true }, (error) => { if (error) throw error; })
            fs.readdir(path.join(__dirname, 'assets', `${dir}`), (error, files) => {
                if (error) throw error;
                files.forEach(file => {
                    fs.promises.copyFile(
                        path.join(__dirname, 'assets', `${dir}`, `${file}`),
                        path.join(__dirname, 'project-dist', 'assets', `${dir}`, `${file}`),
                    )
                })
            })
        })
    })

})()
