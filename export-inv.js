// 'use strict';
// const fs = require('fs');

console.log("hello")
document.body.style.border = "5px solid red";

/////////////////////////// DOM manipulation
const button = document.createElement("button");
const controlsContainer = document.createElement("div");
controlsContainer.style.padding = "10px";
button.innerHTML = "DOWNLOAD ITEMS";
controlsContainer.appendChild(button);
button.addEventListener("click", function () {
    console.log("button click");
    let response = getItems();
    let assets = response.assets;
    let descriptions = response.descriptions;
    let itemsMap = new Map();

    putDescriptionsInMap(descriptions, itemsMap);
    assets.reverse();
    processItems(assets, itemsMap);
});

let buttonPlacement = document.getElementById("active_inventory_page");
let parent = buttonPlacement.parentElement;
parent.insertBefore(button, buttonPlacement);

/////////////////////////// JSON manipulation
function getItems() {
    console.log("get items");
    let xmlHttp = new XMLHttpRequest();
    let steamID64 = "76561198017460423";
    let inventoryIdCSGO = 730
    let itemsCount = 500;
    let inventoryURL = "https://steamcommunity.com/inventory/" + steamID64 + "/" + inventoryIdCSGO + "/2?l=english&count=" + itemsCount;
    xmlHttp.open("GET", inventoryURL, false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function putDescriptionsInMap(descriptions, itemsMap) {
    descriptions.forEach((it) => {
        let uniqueDescription = it.classid + "_" + it.instanceid;
        itemsMap.set(uniqueDescription, it);
    })
}

function processItems(assets, itemsMap) {
    console.log("process items");
    let file = "";
    assets.forEach((a) => {
        let uniqueAsset = a.classid + "_" + a.instanceid;
        let item = itemsMap.get(uniqueAsset);
        file += createLine(item.tags, item.name)
    })
    console.log(file);
    // fs.writeFileSync('items.csv', file);
}

function createLine(tags, name) {
    let type = tags.find(tag => tag.category === 'Type').localized_tag_name;
    if (type === 'Container') {
        return "--------------- container\n";
    } else if (type === 'Knife') {
        return "--------------- knife\n";
    } else if (type === 'Agent') {
        return "--------------- knife\n";
    } else if (type === 'Tool') {
        return "--------------- tool\n";
    } else if (type === 'Collectible') {
        return "--------------- tool\n";
    } else if (type === 'Gloves') {
        return "--------------- tool\n";
    } else if (type === 'Music Kit') {
        return "--------------- music kit\n";
    } else if (type === 'Patch') {
        return "--------------- patch\n";
    } else if (type === 'Pass') {
        return "--------------- pass\n";
    }

    let weapon = tags.find(tag => tag.category === 'Weapon')
    if (weapon !== undefined) {
        let itemName = name.split("| ")[1];
        let weapon = tags.find(tag => tag.category === 'Weapon').localized_tag_name;
        let origin = tags.find(tag => tag.category === 'ItemSet').localized_tag_name;
        let condition = tags.find(tag => tag.category === 'Exterior').localized_tag_name;
        let stattrak = tags.find(tag => tag.category === 'Quality').localized_tag_name === "Normal" ? 0 : 1;
        let rarity = tags.find(tag => tag.category === 'Rarity').localized_tag_name;
        return itemName + "," + condition + "," + stattrak + "," + weapon + "," + rarity + "," + origin + " \n";
    } else {
        return "item not managed ----------------------------" + name + "\n";
    }
}

