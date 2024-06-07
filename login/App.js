const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');



const port = 3000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
    res.render('index')
});


app.post('/login', (req, res) => {

    const login = req.body.usuario
    const senha = req.body.senha

    fs.readFile('usuarios.json', 'utf8', (error, data) => {
        if (error) {
            console.log('Erro ao escrever o arquivo', error)
            res.status(500).send('Erro ao escrever o arquivo')
            return
        }

        const usuarios = JSON.parse(data).usuarios
        console.log(usuarios)

        const usuarioEncontrado = usuarios.find((usuario) => { return usuario.usuario === login && usuario.senha === parseInt(senha)});

        if (usuarioEncontrado) {
            res.render('login')
        }
        else {
            res.render('erro')
        }
    })


});
