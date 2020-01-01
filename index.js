const express = require('express')
const app = express()
const port = 3000;
const facedection = require('./src/facedection');
const {detectFace, loadModels, recognizeFace} = facedection;


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/detectFace', async(req, res)=>{
    let imagename = req.query.img;
    await loadModels();
    let fullFaceDescriptions = await detectFace(imagename);
    await recognizeFace(fullFaceDescriptions);
  
    res.send("done");
});

app.listen(port, () => console.log(`Obtacle Detection server running at ${port}`))