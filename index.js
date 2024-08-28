let inputDebounceTimeout;
const textarea = document.querySelector(".textarea"),
    counter = document.querySelector('.counter');
    const numbers = document.querySelector(".numbers");
        
textarea.addEventListener("input", (e) => {
    clearTimeout(inputDebounceTimeout);
    inputDebounceTimeout = setTimeout(function(){
        onInput(e.target.innerHTML);
    }, 1000) 
});

if (window.location.hash) {
    const prevText = decodeURI(window.location.hash.slice(1));
    textarea.innerHTML = prevText;
    onInput(prevText);
    moveCursorToEnd(textarea);
}

function onInput(text){
    document.title = textarea.firstChild.innerText ?? textarea.innerText; 
    window.location.hash = encodeURI(text);
    counter.innerText = textarea.innerText.length + ' characters';
    setTimeout(function(){
        setLineNumbers();
    }, 1)
}

function onAddLink(){
    const prompt = window.prompt('Enter URL, or empty to remove any link');
    if(prompt){
        document.execCommand('createLink',false,prompt);
    }else{
        document.execCommand('unlink')
    }
}

function setLineNumbers(){
    numbers.innerHTML = '';
    // const nodes = textarea.childNodes;
    const nodes = document.querySelectorAll('.textarea > div');
    for(let i = 0, n = nodes.length; i < n; i++){
        const count = document.createElement('div');
        count.style.position = 'absolute';
        count.style.top = nodes[i].offsetTop + 'px';
        numbers.appendChild(count);
    }
}

function moveCursorToEnd(input) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(input, input.childNodes.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

/// Tab key handler
textarea.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
        e.preventDefault();
        document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;')
    }
});

/// Link click
document.addEventListener('mousedown',function(e){
    if (e.shiftKey || e.altKey){
        if (e.target.href){
            window.open(e.target.href, '_blank')
        }
    }
})