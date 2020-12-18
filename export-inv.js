document.body.style.border = "10px solid red";




const button = document.createElement("button");
const controlsContainer = document.createElement("div");
controlsContainer.style.padding = "10px";
button.innerHTML = "START SCAN";
button.addEventListener("click", function () {
    getItems();
});
controlsContainer.appendChild(button);

setTimeout(function () {
    let buttonPlacement = document.getElementById("active_inventory_page");
    let parent = buttonPlacement.parentElement;
    parent.insertBefore(button, buttonPlacement);
}, 2000);



pagesLimit = 2;
const itemsLimit = 50;
let list = [];
let csvContent = "data:text/csv;charset=utf-8\n";


function getItems(){
    let xmlHttp = new XMLHttpRequest();
    let inventoryURL = "https://steamcommunity.com/inventory/76561198017460423/730/2?l=english&count=75";
    xmlHttp.open( "GET", inventoryURL, false ); // false for synchronous request
    xmlHttp.send( null );
    let items = JSON.parse(xmlHttp.responseText);
    console.log(items);
    return xmlHttp.responseText;
}



