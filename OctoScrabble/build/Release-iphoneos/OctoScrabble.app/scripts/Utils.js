var DEBUG_LEVEL = 21;
var queue = new Array();
var sending = false;
// USAGE: output debuggin info to textfield, helper function.
// PARAM: (txt) the text to show
// PARAM: (append) if true text is appended otherwise the textarea is cleared before displaying
// RETURNS (none)
function Debug(txt, lvl) {
return;
    if (lvl < DEBUG_LEVEL) return;
    var dObj = new Object();
    dObj.txt = txt;
    dObj.lvl = lvl;
    queue.push(dObj);
    if (!sending) Send();
}
function Send() {
return;
    sending = true;
    var dObj = queue.pop();
    var url = "/debugger/debug.php?debugtxt=" + dObj.txt + "&level=" + dObj.lvl;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (queue.length > 0)
                setTimeout("Send()", 1000);
            else
                sending = false;
        }
    }
    xmlhttp.send();

}
function ClearDebug() {
return;
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "/debugger/debug.php?delete", true);
    xmlhttp.send();
}