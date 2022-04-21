function incarcaJocuri(){
    let http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByTagName("p")[0].innerHTML="";
            load(this);
        }
    };
    http.open("get","http://localhost:5678/resurse/jocuri.xml",true)
    http.send();
}
function load(xml)
{
    var xmlDoc=xml.responseXML;
    var table="<tr><th>Nume</th><th>Tip</th><th>Nume Firma</th><th>Locatie</th><th>An</th><th>Luna</th><th>Zi</th><th>Online</th>";
    var jocuri= xmlDoc.getElementsByTagName('joc')
    for(let i=0;i<jocuri.length;i++)
    {
        var joc=jocuri[i];
        table+="<tr><td>"+
        joc.getElementsByTagName("nume")[0].childNodes[0].nodeValue+"</td><td>"+
        joc.getElementsByTagName("tip")[0].childNodes[0].nodeValue+"</td><td>"+
        joc.getElementsByTagName("nume_firma")[0].childNodes[0].nodeValue+"</td><td>"+
        joc.getElementsByTagName("locatie")[0].childNodes[0].nodeValue+"</td><td>"+
        joc.getElementsByTagName("an")[0].childNodes[0].nodeValue+"</td><td>"+
        joc.getElementsByTagName("luna")[0].childNodes[0].nodeValue+"</td><td>"+
        joc.getElementsByTagName("zi")[0].childNodes[0].nodeValue+"</td><td>"+
        joc.getElementsByTagName("online")[0].childNodes[0].nodeValue+
        "</td></tr>";
    }
    document.getElementById("games").innerHTML=table;
}