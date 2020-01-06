const tf = require('@tensorflow/tfjs-node');
 
const cocossd = require('@tensorflow-models/coco-ssd');
const toUint8Array  = require('base64-to-uint8array');

const imagetoBase64 = require('image-to-base64')


exports.detectObject = async image =>{
    let predictions = null;
    let imageData = await getImageData(image);

    const tensor3D = getTensor3dObject(3, imageData);
    const model = await loadCocossdModel();
    predictions = await model.detect(tensor3D);
    tensor3D.dispose()
    console.log(predictions);

}

const getImageData = async path => await imagetoBase64(path);

const getTensor3dObject = (numOfChannels, imageData) => {
 
    var imageArray = toUint8Array(imageData);
    console.log(imageArray);
   
    const tensor3d = tf.node.decodeJpeg( imageArray, numOfChannels );


    return tensor3d;
}

const loadCocossdModel = async ()=>{
    const modal = await cocossd.load({
        base: 'mobilenet_v2'
    })
    return modal;
}

