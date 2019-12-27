// require('@tensorflow/tfjs-node');
const MODEL_PATH = './src/models';
const faceapi = require('face-api.js');
const canvas = require('canvas');

const { Canvas, Image, ImageData} = canvas
faceapi.env.monkeyPatch({Canvas, Image, ImageData});

///Load all the models for detecting faces
exports.loadModels = async ()=>{
    
}



///load image



 exports.detectFace = async () => {

    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH).catch((e)=>{console.log(e)});
     var image = await canvas.loadImage('./src/images/peter1.jpg');
     try{
        let fullFaceDetetection = await faceapi.detectAllFaces(image);
        console.log(fullFaceDetetection);
     }
     catch(err){
         console.log(err);
     }
    
    // console.log(fullFaceDetetection);
}


