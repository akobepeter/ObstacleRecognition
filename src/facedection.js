//require('@tensorflow/tfjs');
const MODEL_PATH = './src/models';
const faceapi = require('face-api.js');
const canvas = require('canvas');

const { Canvas, Image, ImageData} = canvas
faceapi.env.monkeyPatch({Canvas, Image, ImageData});

///Load all the models for detecting faces
exports.loadModels = async ()=>{
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH).catch((e)=>{console.log(e)});
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH).catch((e)=>{console.log(e)});
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH).catch((e)=>{console.log(e)}); 
}



///load image



 exports.detectFace = async () => {

     var image = await canvas.loadImage('./src/images/peter1.jpg');
     try{
        let fullFaceDetetection = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        console.log(fullFaceDetetection);
     }
     catch(err){
         console.log(err);
     }
    
    // console.log(fullFaceDetetection);
}

exports.recognizeFace = async()=>{
  
    let names = ['kemi', 'peter'];

    let labeledFaceDescriptors = await Promise.all(names.map(async (name,i)=>{
        let descriptors = [];
        let imagepath = `./src/faces/${name}`
        for(let i = 1; i<5; i++){
            let image = canvas.loadImage(imagepath + `${i}.jpg`);
            let faceDescriptor = await faceapi.detectSingleFace(image).withFaceDescriptors().withFaceLandmarks();
            descriptors.push(faceDescriptor.descriptor);
        }

        return new faceapi.labeledFaceDescriptors(name,descriptors);

    }));

}


