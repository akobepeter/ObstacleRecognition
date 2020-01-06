const express = require('express')
const app = express();
var path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const port = 3000;
const facedection = require('./src/facedection');
const {detectFace, loadModels, recognizeFace} = facedection;
const objectdetection = require('./src/objectdetection');
const {detectObject} = objectdetection

app.use(express.static(path.join(__dirname, '/public')));
app.use(fileUpload());
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
});
app.post('/addPicture', (req, res)=>{
    let name = req.body.name;
    let files = [];
    for(let i = 1; i <=5; i++){
        let fname = "file" + i;
        files.push(req.files[fname]);
    }
    let path = 'src/faces/' + name + '/';
    if(fs.existsSync(path)){
        files.map((file,i)=>{
            let splitname = file.name.split('.');
            let ext = splitname[splitname.length -1];
            let filename = path + (i+1) + '.' + ext;
            file.mv(filename, (err)=>{
                if(err) res.status(500).send(err);
            });
        });
    }
    else{
        fs.mkdirSync(path);
        files.map((file,i)=>{
            let splitname = file.name.split('.');
            let ext = splitname[splitname.length -1];
            let filename = path + (i+1) + '.' + ext;
            file.mv(filename, (err)=>{
                if(err) res.status(500).send(err);
            });
        });
    }

    res.status(200).send({
        message: "Face Has been added",
        status: 'success'
    })

});

app.listen(port, () => console.log(`Obtacle Detection server running at ${port}`))