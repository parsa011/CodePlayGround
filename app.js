var textAreas = document.querySelectorAll('.code');
var typingTimer; //timer identifier
var doneTypingInterval = 1000; //time in ms, 5 second for example

var withTwinCharacter = [16,219,57,222];
textAreas.forEach(element => {
    element.addEventListener('keydown', e => {
        // use tab for add a \t
        if (e.key === 'Tab' && !e.shiftKey) {
            document.execCommand('insertText', false, "   ");
            e.preventDefault();
            return false;
        }
        
    });
    element.addEventListener('keyup', e => {
       
        element.innerHTML.replace("<div><br></div>",'\n');
        element.innerHTML.replace("</br>",'\n');

        clearTimeout(typingTimer);
        typingTimer = setTimeout(compile, doneTypingInterval);
    });
});


var lastScript;

function compile() {
    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;
    // regex for replace &nbsp; with ' '
    var re = new RegExp(String.fromCharCode(160), "g");
    code.open();
    
    code.writeln(
        html.textContent.replace(re," ") +
        "<style>" +
        css.textContent.replace(re," ") +
        "</style>"
    );
    if (js.value != lastScript) {
        code.writeln("<script>" +
            js.textContent +
            "</script>");
        lastScript = js.textContent;
    }
    code.close();
}

// add twink of a 
function addTwins(element,value){    
    var startPos = document.getSelection().anchorOffset;
    var endPos = document.getSelection().anchorOffset;
    element.textContent = element.textContent.substring(0, startPos) +
        value +
        element.textContent.substring(endPos, element.textContent.length);
}