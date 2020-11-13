var textAreas = document.querySelectorAll('textarea');
var typingTimer; //timer identifier
var doneTypingInterval = 1000; //time in ms, 5 second for example
var lastChar; // the last typed character
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
        var start = element.selectionStart;
        var lastChar = String.fromCharCode(element.value.charCodeAt(start - 1));
        console.log(lastChar);
        
        if(e.key == lastChar){
            if (lastChar == '{') {
                addTwink(element,"}")
            }
            if (lastChar == '[') {
                addTwink(element,"]")
            }
            if (lastChar == '<') {
                addTwink(element,">")
            }
            if (lastChar == '"') {
                addTwink(element,'"')
            }
            if (lastChar == "'") {
                addTwink(element,"'")
            }
            if (lastChar == "(") {
                addTwink(element,")")
            }
        }else{
            lastChar = e.Key;
        }
        
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

    code.open();
    code.writeln(
        html.value +
        "<style>" +
        css.value +
        "</style>"
    );
    if (js.value != lastScript) {
        code.writeln("<script>" +
            js.value +
            "</script>");
        lastScript = js.value;
    }
    code.close();
}

function addTwink(element,value){    
    var startPos = element.selectionStart;
            var endPos = element.selectionEnd;
            element.value = element.value.substring(0, startPos) +
                value +
                element.value.substring(endPos, element.value.length);
}