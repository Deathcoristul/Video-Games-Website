var id=1;
var myWorker = new Worker('js/worker.js');
myWorker.onmessage=function(event){
    console.log("Notificare: "+event.data);
};
myWorker.postMessage("Procesez");
class Produs {
    constructor(ID, nume, cantitate) {
        this.ID = ID;
        this.nume = nume;
        this.cantitate = cantitate;
    }
}
function add() {
    var table = document.getElementById('buy');
    var name = document.getElementById("name").value;
    var cant = document.getElementById("cant").value;
    if(name=="" || cant=="")
    {
        myWorker.postMessage("Nu s-a introdus nicio dată");
        alert("Nu s-a introdus nicio dată");
    }
    else
    {
        var produs = new Produs(id, name, cant);
        myWorker.postMessage("Se adauga produsul cu id:" + id + " nume:" + name + " cantitate:" + cant);
        localStorage.setItem('Produs', produs);
        row = table.insertRow(table.rows.length);
        idcell = row.insertCell(0);
        namecell = row.insertCell(1);
        cantcell = row.insertCell(2);
        idcell.appendChild(document.createTextNode(id));
        namecell.appendChild(document.createTextNode(name));
        cantcell.appendChild(document.createTextNode(cant));
        id++;
    }
}
class Stocare{
    constructor(){
        this.sursa=null;
    }
    adauga(){

    }
    lista(){

    }
}
class LocalStocare extends Stocare{
    constructor(){
        super();
        this.sursa=localStorage;
    }
    adauga(){
        var arr=[];
        var table = document.getElementById('buy');
        for (let i = 1; i < table.rows.length; i++)
        {
            row=table.rows[i];
            let rowCells=row.cells;
            id=rowCells.item(0).innerHTML;
            name=rowCells.item(1).innerHTML;
            cant=rowCells.item(2).innerHTML;
            arr.push(new Produs(id,name,cant));
        }
        this.sursa.setItem('table',arr);
    }
    lista(){
        console.log(this.sursa.getItem('table'));
    }
}
class DBStocare extends Stocare{
    constructor(){
        super();
        this.sursa= window.indexedDB.open("cumparaturi",1);
        this.sursa.onerror = function(event) {
            console.log("error: ");
        };
        this.sursa.onsuccess = function(event) {
            console.log("success: "+ this.sursa.result);
        };
        this.sursa.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("joc", {keyPath: "id"});
            
        };

    }
    adauga(){
        var db = this.sursa.result;
        var table = document.getElementById('buy');
        for (let i = 1; i < table.rows.length; i++)
        {
            row=table.rows[i];
            let rowCells=row.cells;
            id=rowCells.item(0).innerHTML;
            name=rowCells.item(1).innerHTML;
            cant=rowCells.item(2).innerHTML;
            var request = db.transaction(["joc"],"readwrite")
            .objectStore("joc")
            .add(new Produs(id,name,cant));
            request.onsuccess = function(event){
                alert(name+" a fost adaugat!");
            }
            request.onerror = function(event) {
                alert(name+" exista deja in baza de date!");
             }
        }
        
    }
    lista(){
        var db = this.sursa.result;
        var objectStore = db.transaction("joc").objectStore("joc");
        objectStore.openCursor().onsuccess = function(event){
            if (cursor) {
                alert("Id: " + cursor.key + ", Nume:" + cursor.value.nume + ", Cantitate:" + cursor.value.cantitate);
                cursor.continue();
             } else {
                alert("No more entries!");
             }
        }
    }
}
function saveLocal(){
    var stockLocal=new LocalStocare();
    stockLocal.adauga();
}
function saveDB(){
    var stockDB = new DBStocare();
    stockDB.adauga();
}