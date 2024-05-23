const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'oliviaaa',
    password: '#olivia26',
    database: 'jin'
})

db.connect((error)=> {
    if (error){
        console.log("Erro ao conectar com o banco de dados")
    } else{
        console.log("Conectando ao MySQL")
    }
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/login.html')
})

app.post("/login", (req,res)=>{
    const username = req.body.usuario
    const password = req.body.senha

    db.query('SELECT senha from usuario where nome = ?', [username], (error, results)=>{
        if (results.length > 0){
            const passwordbd = results[0].senha
            console.log(passwordbd)
            res.sendFile(__dirname + '/home.html')
        } else {
            console.log('Usuario não cadastrado')
            res.sendFile(__dirname + '/erro.html')
        }
    })

})

    app.post("/cadastrar", (req,res)=>{
        const newusername = req.body.Novousuario
        const newpassword = req.body.Novasenha

    db.query(' INSERT INTO usuario (nome, senha) VALUES (?, ?)', [newusername, newpassword], (error, results) => {
        if (error){
            console.log(error)
        } else { 
            console.log(results)
            res.sendFile(__dirname + '/login.html')
        }
    })
    })

    app.get('/cadastro', (req, res)=>{
        res.sendFile(__dirname + '/cadastro.html')
        })


app.listen(port, ()=> {
    console.log(`Servidor rodando no endereço: https://localhost:${port}`)
})