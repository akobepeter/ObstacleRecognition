const fs = require('fs');
const MODEL_PATH = './models';
const faceapi = require('face-api.js');

///Load all the models for detecting faces
const loadModels = async ()=>{
    await faceapi.loadSsdMobilenetv1Model(MODEL_PATH).catch((err)=>{
        console.log(err)
    });
await faceapi.loadFaceLandmarkModel(MODEL_PATH).catch((err)=>{
    //console.log(err)
});
await faceapi.loadFaceRecognitionModel(MODEL_PATH).catch((err)=>{
    //console.log(err)
});
await faceapi.loadFaceExpressionModel(MODEL_PATH).catch((err)=>{
    //console.log(err)
});
}


///load image
var image = null;
fs.readFile('./src/images/peter1.jpg', (err, data)=>{
    if(err){
        // console.log(err);
        return;
    }
    data = Buffer.from(data).toString('base64');
    image = `<img src="data:image/jpeg;base64, ${data}">`;
});



 exports.detectFace = async () => {
     try{
        let fullFaceDetetection = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
     }
     catch(err){
         console.log(err);
     }
    
    console.log(fullFaceDetetection);
}


