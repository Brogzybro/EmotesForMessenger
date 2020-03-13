console.log("Script is running :),,");

window.b = window.browser
if(window.b == null){
    window.b = window.chrome
}
window.textElements = null;
window.js_1 = null;

var js_1lastChild = null;

//facebook vars
var listOfChats = null;

var links = [];
var emoteNames = [];
var counter = 0;

//listens to changes on messenger
const observer = new MutationObserver(function(mutations){ 
    mutations.forEach(function (mutation){
        if(mutation.addedNodes.length){
            var newMessage = $(mutation.addedNodes[0].firstChild).find('._58nk').get(0);
            js_1lastChild = window.js_1.lastElementChild.firstChild.firstChild;
            observer.observe(js_1lastChild, {
                childList: true
            })
            if(newMessage != null){
                var indexOfEmote = checkIfMssgIsEmote(newMessage);
                if(indexOfEmote != -1){
                    replaceToEmote(newMessage, indexOfEmote);
                }
            }
        }
    })
})

const observerFB = new MutationObserver(function(mutations){ //for facebook
    mutations.forEach(function (mutation){

    });
});

const chatObserver = new MutationObserver(function(mutations){ //for facebook
    mutations.forEach(function (mutation){
        
    });
});



window.document.addEventListener('load', checkURL());


function checkURL(){
    let url = window.location.href;
    if(url.includes('messenger.com/t/')){
        console.log("messenger");
        setTextElements();
    }
    else if(url.includes('messages/t/')){
        setTextElements();
    }
    else if(url.includes('facebook.com')){
        console.log("facebook");
        // to be made..
    }
}



//Goes through the elements on screen from reload, and replaces elements to emotes
function replaceInitialToEmotes(){
    for(var i = 0 in textElements){
        var indexOfEmote = checkIfMssgIsEmote(textElements[i])
        if(indexOfEmote != -1){
            replaceToEmote(textElements[i], indexOfEmote);
        }
    }
}

//Gets the initial elements, puts observe two elements
function setTextElements(){
    window.js_1 = $('.__i_').children().eq(2)[0];
    window.textElements = document.getElementsByClassName('_3oh- _58nk');
    if (textElements.length == 0 || js_1 == null){
        console.log("waiting");
        counter++;
        setTimeout(setTextElements, 1000);
    }else{
        js_1lastChild = window.js_1.lastElementChild.firstChild.firstChild;
        observer.observe(window.js_1, {
            childList: true
        });
        observer.observe(js_1lastChild, {
            childList: true
        })
        replaceInitialToEmotes();
    }
}

//Checks if element is an emote
function checkIfMssgIsEmote(element){ // TODO: Check if message contains emote, and if it's only emotes 
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
    return result;
}

//Replaces element with a new <img src=blabla
function replaceToEmote(element, indexOfLink){ // TODO: Try to just make img as a child of element's father.(don't replace the element, it should be deleted later) Does multiple imges display as wanted?
    console.log("making emote");
    var Img = document.createElement("img");
    Img.src = links[indexOfLink];
    Img.alt = emoteNames[indexOfLink];
    Img.title = emoteNames[indexOfLink];
    $(element).closest('._3058').css({"background-color": "rgb(0, 153, 255, 0)", "background-image": "none"});
    $(element).replaceWith(Img);
}

//Listens to messages from background.js
window.b.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.message === "tabUpdated"){
            console.log("tabUpdated");
            checkURL();
        }if(request.message === "emoteNames"){

        }
        return Promise.resolve({response: "message recieved"});
    }
)

//Sends initial msg to background.js to recieve lists made from imagelinks.csv
window.b.runtime.sendMessage({msg: "ready"}, function(response){
    emoteNames = response.emotesNames;
    links = response.links;
});
