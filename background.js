
window.b = window.browser
var csvFile = null;
var emoteNames = [];
var links = [];

if(window.b == null){
    window.b = window.chrome
}

//Sends msg to main.js when the url changes
window.b.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    window.b.tabs.query({active: true, currentWindow: true,}, function (tabs){
        var activeTab = tabs[0];
        if(activeTab != null){
            window.b.tabs.sendMessage(activeTab.id, {"message": "tabUpdated"});
        }
    });
});

var csvFile = window.b.runtime.getURL("imagelinks.csv");
$(document).ready(function(){ // gets the csv file
    $.ajax({
        type: "GET",
        url: csvFile,
        dataType: "text",
        success: function(data) {csvToTwoArrays(data)}
     });
})

function csvToTwoArrays(data){
    var allTextLines = data.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i = 1; i < allTextLines.length; i++){
        var splitted = allTextLines[i].split(',');
        emoteNames.push(splitted[0]);
        links.push(splitted[1]);
    }

}

//Listens for when main.js is "ready", sends lists from csv file.
window.b.runtime.onMessage.addListener( function (request, sender, sendResponse){
    if (request.msg == "ready"){
        sendResponse({emotesNames: emoteNames, links: links});
    }
})