function switching(evt){
console.log(evt.keyCode);
}

document.addEventListener('keydown', switching);

function detectspecialkeys(e){
    var evtobj=window.event? event : e
    if (evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey)
        alert("you pressed one of the 'Alt', 'Ctrl', or 'Shift' keys")
}
document.onkeypress=detectspecialkeys;
document.addEventListener('keydown', detectspecialkeys);


