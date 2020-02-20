console.log("Script is running :),,");

window.b = window.browser
if(window.b == null){
    window.b = window.chrome
}
window.textElements = null;
window.js_1 = null;

var js_1lastChild = null;

var links = [];
var emoteNames = [];

const observer = new MutationObserver(function(mutations){
    mutations.forEach(function (mutation){
        if(mutation.addedNodes.length){
            console.log("Observed")
            console.log(mutation.addedNodes[0]);
            var newMessage = $(mutation.addedNodes[0].firstChild).find('._58nk').get(0);
            js_1lastChild = window.js_1.lastElementChild.firstChild.firstChild;
            console.log(observer);
            observer.observe(js_1lastChild, {
                childList: true
            })
            console.log(window.js_1);
            console.log(js_1lastChild);
            console.log(newMessage);
            if(newMessage != null){
                var indexOfEmote = checkIfMssgIsEmote(newMessage);
                if(indexOfEmote != -1){
                    replaceToEmote(newMessage, indexOfEmote);
                }
            }
        }
    })
})



window.document.addEventListener('load', initialChanges());


function replaceToKEKW(){
    for(var i = 0 in textElements){
        /* if(textElements[i].innerHTML == "KEKW"){
            var newIMG = kekwImg.nodeValue;
            $(textElements[i]).closest('._3058').css("background-color", "rgb(0, 153, 255, 0)");
            $(textElements[i]).replaceWith(newIMG);
            replaceToKEKW();
        } */
        var indexOfEmote = checkIfMssgIsEmote(textElements[i])
        if(indexOfEmote != -1){
            replaceToEmote(textElements[i], indexOfEmote);
        }
    }
}

function setTextElements(){
    window.textElements = document.getElementsByClassName('_3oh- _58nk');
    var listOfI = [1,3,"b",9];
    for(var i = 0; i < listOfI.length; i++){
        window.js_1 = $("#js_"+listOfI[i]+"").get(0);
        console.log(window.js_1);
        if (window.js_1 != null){
            break;
        }
    }
    if (textElements.length == 0 || js_1 == null){
        console.log("waiting");
        console.log(window.js_1);
        setTimeout(setTextElements, 1000);
    }else{
        
        $('._51-3 _1ht1 _6zk9').on('click', function(){
            setTimeout(initialChanges(), 1000);
        });
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
    if(text == null){
        return -1;
    }
    var splitted = text.split(" ");
    var result = -1;
    if(splitted.length >= 2){
        return result;
    }
    for (var i in emoteNames){
        if(text == emoteNames[i]){
            result = i
            return result;
        }
    }
    console.log(text);
    console.log(result);
    return result;
}

function replaceToEmote(element, indexOfLink){ // TODO: MAKE GENERIC
    console.log("making emote");
    var Img = document.createElement("img");
    console.log(links[indexOfLink]);
    Img.src = links[indexOfLink];
    Img.alt = emoteNames[indexOfLink];
    $(element).closest('._3058').css("background-color", "rgb(0, 153, 255, 0)");
    $(element).replaceWith(Img);
}
window.b.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log(request);
        if(request.message === "tabUpdated"){
            setTextElements();
        }if(request.message === "emoteNames"){

        }
        return Promise.resolve({response: "message recieved"});
    }
)

window.b.runtime.sendMessage({msg: "ready"}, function(response){
    emoteNames = response.emotesNames;
    links = response.links;
    console.log(links);
    console.log(emoteNames);
});

function initialChanges(){
    setTextElements();
    
}
