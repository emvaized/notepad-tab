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
    // const num = textarea.innerHTML.split("<br>").length;
    // const num = textarea.childNodes.length;
    // numbers.innerHTML = Array(num).fill("<span></span>").join("");
    numbers.innerHTML = '';

    const nodes = textarea.childNodes;
    for(let i = 0, n = nodes.length; i < n; i++){
        const count = document.createElement('div');

        count.style.position = 'absolute';
        count.style.top = nodes[i].offsetTop + 'px';
        count.style.right = '0px';
        // count.innerText = i;

        // count.onclick = function(){
        //     nodes[i].focus()
        // }
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