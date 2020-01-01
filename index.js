const express = require('express')
const app = express()
const port = 3000;
const facedection = require('./src/facedection');
const {detectFace, loadModels, recognizeFace} = facedection;


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/detectFace', async(req, res)=>{
    await loadModels();
    await recognizeFace()
    // await detectFace();
    res.send("done");
});

app.listen(port, () => console.log(`Obtacle Detection server running at ${port}`))