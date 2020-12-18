document.body.style.border = "10px solid red";


let nextBtn = document.getElementById("pagebtn_next");
let itemName = document.getElementById("iteminfo1_item_name");
let itemTags = document.getElementById("iteminfo1_item_tags_content");

const button = document.createElement("button");
button.innerHTML = "START SCAN";
button.addEventListener("click", function () {
    // processItems();
    getItems();
    // scanItems();
});

setTimeout(function () {
    let buttonPlacement = document.getElementById("inventory_logos");
    console.log(buttonPlacement);
    buttonPlacement.appendChild(button);
}, 2000);


let pagesLimit = document.getElementById('pagecontrol_max').innerText;
pagesLimit = 2;
const itemsLimit = 50;
let list = [];
let csvContent = "data:text/csv;charset=utf-8\n";


function getItems(){
    var xmlHttp = new XMLHttpRequest();
    let inventoryURL = "https://steamcommunity.com/inventory/76561198017460423/730/2?l=english&count=75";
    xmlHttp.open( "GET", inventoryURL, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}


function scanItems(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    // return xmlHttp.responseText;
    setTimeout(function () {
        console.log(list)
        for (let i = 0; i < itemsLimit; i++) {
            setTimeout(function () {
                list.item(i).firstChild.lastChild.click();
                list.item(i).firstChild.lastChild.click();
                setTimeout(function()  {
                    const line = formatLine(itemTags.innerText);
                    csvContent += line + "\n";
                    console.log(csvContent)
                }, 2000)
            }, 1000 * i);
        }
    }, 1050 * pagesLimit);
}



function setIntervalLimited(callback, interval, x) {
    for (let i = 0; i < x; i++) {
        setTimeout(callback, i * interval);
    }
}

function formatLine(rawTags) {
    let tags = rawTags.split(", ");
    const name = itemName.innerText.split("| ")[1];
    const grade = tags[5];
    const stattrak = tags[3] === "Normal" ? 0 : 1;
    const weapon = tags[1];
    const origin = tags[2];
    return name + ","
        + grade + ","
        + stattrak + ","
        + weapon + ","
        + origin;
}


