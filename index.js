const express = require('express')
const app = express()
const port = 3000;
const dosomething = require('./src/facedection').dosomething;

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/detectFace', (req, res)=>{
    let name = req.query.name;
    let output = dosomething(name);
    res.send(output);
})

app.listen(port, () => console.log(`Obtacle Detection server running at ${port}`))