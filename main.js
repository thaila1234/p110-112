https://teachablemachine.withgoogle.com/models/i5Ehi4Ltn/
var previsao1 = " ";
var previsao2 = " ";

var webcam = document.getElementById("webcam");
Webcam.attach("#webcam")
Webcam.set({
    width: 300,
    height: 250,
    imageFormat: 'png', 
    pngQuality: 90
})

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="imagem" src="'+data_uri+'"/>'
    })
}
console.log(ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i5Ehi4Ltn/model.json', modelLoaded);
function modelLoaded(){
    console.log("modelLoaded")
}

function speak(){
    var synth = window.speechSynthesis;
    fala1 = "A primeira previsão é:" + previsao1;
    var utterThis = new SpeechSynthesisUtterance(fala1);
    synth.speak(utterThis)
}

function check(){
    img = document.getElementById("imagem");
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if (error){
        console.error(error)
    }
    else{
        document.getElementById("emotioName").innerHTML = results[0].label;
        previsao1 = results[0].label;
        speak();
        if (results[0].label == "tranquilo"){
            document.getElementById("emoji").innerHTML = "&#129305;"
        }
        if (results[0].label == "vitoria"){
            document.getElementById("emoji").innerHTML = "	&#9996;"
        }
        if (results[0].label == "legal"){
            document.getElementById("emoji").innerHTML = "	&#128077;"
        }

    }
}