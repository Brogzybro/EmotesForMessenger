console.log("Script is running :),,");

window.textElements = null;
var kekwImg = document.createElement("img");
kekwImg.src = "https://cdn.betterttv.net/emote/5dae422b89488d12cc727c80/2x"
kekwImg.innerHTML = "KEKW";


const observer = new MutationObserver(function(mutations){
    mutations.forEach(function (mutation){
        if(mutation.addedNodes.length){
            console.log(mutation.addedNodes[0]);
            var newMessage = $(mutation.addedNodes[0].firstChild).find('._58nk').get(0);
            js_1lastChild = window.js_1.lastElementChild.firstChild.firstChild;
            console.log(js_1lastChild);
            console.log(newMessage);
            if(newMessage != null){
                console.log(checkIfMssgIsEmote(newMessage))
                if(checkIfMssgIsEmote(newMessage) == 1){
                    replaceToEmote(newMessage)
                }
            }
        }
    })
})
window.js_1 = null;

var js_1lastChild = null;



window.document.addEventListener('load', initialChanges());


function replaceToKEKW(){
    for(var i = 0 in textElements){
        if(textElements[i].innerHTML == "KEKW"){
            $(textElements[i]).closest('._3058').css("background-color", "rgb(0, 153, 255, 0)");
            $(textElements[i]).replaceWith(kekwImg);
        }
    }
}

function setTextElements(){
    window.textElements = document.getElementsByClassName('_3oh- _58nk');
    window.js_1 = $("#js_1").get(0);
    if(window.js_1 == null){
        window.js_1 = $("#js_4").get(0);
    }
    if (textElements.length == 0 || js_1 == null){
        console.log("waiting");
        console.log(window.js_1);
        setTimeout(setTextElements, 1000);
    }else{
        console.log(js_1);
        js_1lastChild = window.js_1.lastElementChild.firstChild.firstChild;
        console.log(js_1lastChild);
        observer.observe(window.js_1, {
            childList: true
        });
        observer.observe(js_1lastChild, {
            childList: true
        })
        replaceToKEKW();
    }
}

function checkIfMssgIsEmote(element){
    var text = element.innerHTML;
    var splitted = text.split(" ");
    var result = 0;
    if(splitted.length >= 2){
        console.log("length");
        return result;
    }
    if(text == "KEKW"){
        console.log("TEXT = KEKW");
        result = 1;
    }
    console.log(text);
    console.log(result);
    return result;
}

function replaceToEmote(element){ // TODO: MAKE GENERIC
    console.log("making emote");
    var Img = document.createElement("img");
    Img.src = "https://cdn.betterttv.net/emote/5dae422b89488d12cc727c80/1x"
    Img.innerHTML = "KEKW";
    $(element).closest('._3058').css("background-color", "rgb(0, 153, 255, 0)");
    $(element).replaceWith(Img);
}

function initialChanges(){
    setTextElements();
    
}