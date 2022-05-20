const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(
    path.join(__dirname, 'text.txt'));

stdout.write('Привет! Файл был создан. Ввведите текст:\n');

stdin.on('data', data => {
    let textArr = data.toString().split(' ')
    if (textArr == 'exit\r\n') {
        stdout.write('Файл был изменен! Пока')
        process.exit()
    }
    output.write(data)
})

process.on('SIGINT', () => {
    stdout.write('Файл был изменен! Пока')
    process.exit()
})




