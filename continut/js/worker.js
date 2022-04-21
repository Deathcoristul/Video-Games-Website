postMessage("Inainte de procesare");
onmessage=function(event){
    postMessage('Salut'+event.data);
};