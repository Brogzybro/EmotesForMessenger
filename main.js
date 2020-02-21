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
var counter = 0;

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



window.document.addEventListener('load', initialChanges());


function replaceToKEKW(){
    for(var i = 0 in textElements){
        var indexOfEmote = checkIfMssgIsEmote(textElements[i])
        if(indexOfEmote != -1){
            replaceToEmote(textElements[i], indexOfEmote);
        }
    }
}

function setTextElements(){
    if(counter > 20){
        window.location.reload();
    }
    window.textElements = document.getElementsByClassName('_3oh- _58nk');
    var listOfI = [1,3,"b",9];
    for(var i = 0; i < listOfI.length; i++){
        window.js_1 = $("#js_"+listOfI[i]+"").get(0);
        if (window.js_1 != null){
            break;
        }
    }
    if (textElements.length == 0 || js_1 == null){
        console.log("waiting");
        counter++;
        setTimeout(setTextElements, 1000);
    }else{
        
        $('._51-3 _1ht1 _6zk9').on('click', function(){
            setTimeout(initialChanges(), 1000);
        });
        js_1lastChild = window.js_1.lastElementChild.firstChild.firstChild;
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
    return result;
}

function replaceToEmote(element, indexOfLink){ // TODO: MAKE GENERIC
    console.log("making emote");
    var Img = document.createElement("img");
    Img.src = links[indexOfLink];
    Img.alt = emoteNames[indexOfLink];
    $(element).closest('._3058').css("background-color", "rgb(0, 153, 255, 0)");
    $(element).replaceWith(Img);
}
window.b.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
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
});

function initialChanges(){
    setTextElements();
    
}
