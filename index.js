const express = require('express')
const app = express();
var path = require('path');
const port = 3000;
const facedection = require('./src/facedection');
const {detectFace, loadModels, recognizeFace} = facedection;
const objectdetection = require('./src/objectdetection');
const {detectObject} = objectdetection

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/detectFace', async(req, res)=>{
    let imagename = req.query.img;
    await loadModels();
    let fullFaceDescriptions = await detectFace(imagename);
    await recognizeFace(fullFaceDescriptions);
  
    res.send("done");
});

app.get('/detectObject', async(req, res)=>{
    let imagename = req.query.img;
    let path = `src/testimages/${imagename}.jpg`;
    await detectObject(path);
    res.send('done');
})

app.listen(port, () => console.log(`Obtacle Detection server running at ${port}`))