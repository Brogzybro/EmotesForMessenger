
function createPopUp(links, emoteNames){
    console.log("Creating popUp");
    var body = document.body;
    var bgDiv = document.createElement("div");
    bgDiv.classList.add("popupBg");
    $(bgDiv).css({"position": "fixed", "top": 0, "height":"100%", "width":"100%"});

    var mainDiv = document.createElement("div");
    mainDiv.classList.add("popUp");
    $(mainDiv).css({"position": "fixed",
        "top": "169px", 
        "height": "136px",
        "background-color": "#fdfdfd",
        "width": "278px",
        "right": "28.5%",
        "border-radius": "6px",
        "box-shadow": "0 0 10px -2px #4e4e4e",
        "overflow": "auto"});
    var table = document.createElement("table");
    $(table).css({"border-spacing": "7.9px"})
    console.log(links.length);
    for(var i = 0; i<links.length; i++){
        
        if(i%6 == 0){
            tr = table.insertRow();
        }
        
        var td = tr.insertCell();
        var imageDiv = document.createElement("div");
        imageDiv.classList.add("table-img");
        var Img = document.createElement("img");
        Img.src = links[i];
        Img.alt = emoteNames[i];
        Img.title = emoteNames[i];
        Img.height = 32;
        Img.width = 32;

        imageDiv.appendChild(Img);
        td.appendChild(imageDiv);
        
    }
    mainDiv.appendChild(table);
    bgDiv.appendChild(mainDiv);
    body.appendChild(bgDiv);

    $(".popupBg").click(function(){
        this.remove();
    
    });

    $(".table-img").click(function(e){
        console.log("Emote clicked");
        e.stopPropagation();
        // TODO: Copy to Clipboard
    });
}







    

