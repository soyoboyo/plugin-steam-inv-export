'use strict';
const fs = require('fs');

let rawItems = fs.readFileSync('items.json');
let fullItems = JSON.parse(rawItems);
let assets = fullItems.assets;
let items = fullItems.descriptions;

let itemsMap = new Map()

document.body.style.border = "10px solid red";

console.log("hello")
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
    // assets.reverse();
    processItems(assets, itemsMap);
});


setTimeout(function () {
    let buttonPlacement = document.getElementById("active_inventory_page");
    let parent = buttonPlacement.parentElement;
    parent.insertBefore(button, buttonPlacement);
}, 2000);


/////////////////////////////////////////////////////////


function getItems() {
    console.log("get items");
    let xmlHttp = new XMLHttpRequest();
    let inventoryURL = "https://steamcommunity.com/inventory/76561198017460423/730/2?l=english&count=75";
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
    console.log("create line " + name);
    if (tags.length === 6) {
        let itemName = name.split("| ")[1];
        let weapon = tags.find(tag => tag.category === 'Weapon').localized_tag_name;
        console.log("1");
        let origin = tags.find(tag => tag.category === 'ItemSet').localized_tag_name;
        console.log("2");
        let condition = tags.find(tag => tag.category === 'Exterior').localized_tag_name;
        console.log("3");
        let stattrak = tags.find(tag => tag.category === 'Quality').localized_tag_name === "Normal" ? 0 : 1;
        console.log("4");
        let rarity = tags.find(tag => tag.category === 'Rarity').localized_tag_name;
        return itemName + "," + condition + "," + stattrak + "," + weapon + "," + rarity + "," + origin + "\n";
    } else {
        return " "
    }
    // if (tags.length === 6) {
    //     let stattrak = tags[3].localized_tag_name === "Normal" ? 0 : 1;
    //     let weapon = tags[1].localized_tag_name;
    //     let origin = tags[2].localized_tag_name;
    //     let condition = tags[5].localized_tag_name;
    //     let rarity = tags[4].localized_tag_name;
    //     return itemName + "," + condition + "," + stattrak + "," + weapon + "," + rarity + "," + origin + "\n";
    // } else if (tags.length === 4) {
    //     let stattrak = tags[3].localized_tag_name === "Normal" ? 0 : 1;
    //     let weapon = tags[1].localized_tag_name;
    //     let origin = tags[2].localized_tag_name;
    //     return itemName + "," + "," + stattrak + "," + weapon + "," + origin + "\n";
    // } else {
    //     return itemName + "\n";
    // }
}

