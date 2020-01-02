require('@tensorflow/tfjs-node');
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



 exports.detectFace = async (imagename) => {

     var image = await canvas.loadImage(`./src/images/${imagename}.jpg`);
     try{
        let fullFaceDetetection = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
       
        return fullFaceDetetection;
     }
     catch(err){
         console.log(err);
     }
    
    
}

exports.recognizeFace = async(fullFaceDetetections)=>{
  
    let names = ['kemi', 'peter'];

    let labeledFaceDescriptors = await Promise.all(names.map(async (name,i)=>{
        let descriptors = [];
        let imagepath = `./src/faces/${name}/`
        for(let i = 1; i<5; i++){
            let image = await canvas.loadImage(imagepath + `${i}.jpg`);
            let faceDescriptor = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            if(!faceDescriptor) continue;
            else descriptors.push(faceDescriptor.descriptor);
        }

        return  new faceapi.LabeledFaceDescriptors(name,descriptors);

    }));

    const maxDescriptorDistance  = 0.6;
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
    const results = fullFaceDetetections.map(fd=> faceMatcher.findBestMatch(fd.descriptor));
    console.log(results);

}



