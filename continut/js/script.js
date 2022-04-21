//Lab4
//1
function myLang()
{
    const language = window.navigator.language;
    document.getElementById("lang").innerHTML = "Limbaj: " + language;
}
function myOrigin()
{
    const origin = window.location.origin;
    document.getElementById("origin").innerHTML ="Originea: "+ origin;
}
function myTimer() {
  const d = new Date();
  document.getElementById("time").innerHTML =d.toLocaleDateString()+' '+d.toLocaleTimeString();
}
setInterval(myTimer, 1000);
function myOS(){
    const os=window.navigator.platform
    document.getElementById("os").innerHTML="Platform: "+os;
}
function myURL(){
    const url=window.navigator.href
    document.getElementById("url").innerHTML="Adresa URL: "+url;
}
function appName()
{
    const name=window.navigator.appName
    document.getElementById("appname").innerHTML="Nume Aplicație: "+name;
}
function appVersion()
{
    const ver=window.navigator.appVersion
    document.getElementById("appversion").innerHTML="Versiune Aplicație: "+ver;
}
function appCodeName()
{
    const cn=window.navigator.appCodeName
    document.getElementById("codename").innerHTML="Cod Aplicație: "+cn;
}
function userAgent()
{
    const agent=window.navigator.userAgent
    document.getElementById("agent").innerHTML="User Agent: "+agent;
}
function schimbaContinut(resursa,jsFisier,jsFunctie)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.head.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    };
    xhttp.open("GET", resursa+'.html', true);
    xhttp.send();
}
//2
var first = null;//primul click
var clicks = 0;
var nrdreptunghiuri=0;
function drawCanvas(event) {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    clicks = clicks + 1;
    switch(clicks){
        case 1:
            if(nrdreptunghiuri==2)
            {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                nrdreptunghiuri=0;
            }
            first = [event.offsetX, event.offsetY];//punctul la primul click
            break;
        case 2:
            let second = [event.offsetX, event.offsetY];//punctul la al doilea click
            clicks = 0;
            ctx.fillStyle = document.getElementById('fill').value;
            ctx.strokeStyle = document.getElementById('border').value;
            ctx.fillRect(Math.min(first[0], second[0]), Math.min(first[1], second[1]), Math.abs(first[0] - second[0]), Math.abs(first[1] - second[1]));
            ctx.strokeRect(Math.min(first[0], second[0]) - 1, Math.min(first[1], second[1]) - 1, Math.abs(first[0] - second[0]) + 2, Math.abs(first[1] - second[1]) + 2);
            first = null;
            nrdreptunghiuri++;
            break;
    }
}
//3
function NewLine(){
    var table = document.getElementById('myTable'),row = table.insertRow(table.rows.length),i;
    for (i = 0; i < table.rows[0].cells.length; i++) {
        createCell(row.insertCell(i));
    }
}
function NewColumn(){
    var table = document.getElementById('myTable'),i;
    for (i = 0; i < table.rows.length; i++) {
        createCell(table.rows[i].insertCell(table.rows[i].cells.length));
    }
}
function createCell(cell) {
    var div = document.createElement('div');
    cell.appendChild(div);                   
}

function ColorChange(){
    var table = document.getElementById('myTable');
    var index=document.getElementById('index').value;
    if(index<=table.rows.length && index >= 0)
    {
        for(let i=0;i<table.rows.length;i++){
            row=table.rows[i];
            cell=row.cells;
            cell[index].style.backgroundColor=document.getElementById('tabcolor').value;
        }
    }
}
//Lab 7
function enable()
{
    var l=document.getElementsByTagName("input").length;
    console.log(l);
    for(let i=0;i<l;i++)
    {
        if(i in [6,7,8,9,10]){

        }
        else{
            if(document.getElementsByTagName("input")[i].innerHTML=="")
                document.getElementById("btn").disabled=false;
            else
                document.getElementById("btn").disabled=true;
        }
    }
}

function check(){
    var json, exists=false;
    var File= new XMLHttpRequest();
    File.overrideMimeType("application/json");
    File.open("GET","resurse/utilizatori.json",true);
    File.onreadystatechange=function()
    {
        if(File.readyState==4 && File.status==200){
            json=JSON.parse(File.responseText);
            for(i = 0; i < json.length; ++i)
            {
                if(document.getElementById("user_name").value == json[i].utilizator && document.getElementById("password").value == json[i].parola)
                {
                    exists = true;  
                    break;
                }
            }
            if(exists)
            {
                alert("Cont introdus corect!");
            }
            else
            {
                alert("Cont introdus greșit! Mai încearcă încă odată!");
            }
        }   
    }
    File.send();
}
function signUp(){
    var json, exists=false;
    var File= new XMLHttpRequest();
    File.overrideMimeType("application/json");
    File.open("POST","resurse/utilizatori.json",true);
    File.onreadystatechange=function()
    {
        if(File.readyState==4 && File.status==200){
            json=JSON.parse(File.responseText);
            for(i = 0; i < json.length; ++i)
            {
                if(document.getElementById("user_name").value == json[i].utilizator && document.getElementById("password").value == json[i].parola)
                {
                    exists = true;  
                    break;
                }
            }
            if(exists)
            {
                alert("Acest cont deja există!");
            }
            else
            {
                alert("Cont introdus!");
            }
        }   
    }
    File.send();
}
