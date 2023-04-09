Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yjU2p2V8t/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;

        if(results[0].label == "Proper Mask"){
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }

        if(results[0].label == "Improper Mask"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if(results[0].label == "No Mask"){
            document.getElementById("update_emoji").innerHTML = "&#128552;";
        }
    }
}