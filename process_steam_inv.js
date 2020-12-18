'use strict';
const fs = require('fs');

let rawItems = fs.readFileSync('items.json');
let fullItems = JSON.parse(rawItems);
let assets = fullItems.assets;
let items = fullItems.descriptions;

let itemsMap = new Map()
let assetsSet = new Set()
let descriptionSet = new Set()

function findMissingItems() {
    items.forEach((it) => {
        let uniqueDescription = it.classid + "_" + it.instanceid;
        itemsMap.set(uniqueDescription, it);
    })
    assets.reverse()
}

function loadItems() {
    let resultItems = [];
    items.forEach((item) => {
        for (const key in item) {
            const result = Object.fromEntries(
                Object.entries(item)
                    .filter(([key]) => key == "name" || key == "tags")
            )
            resultItems.push(result);
        }
    })

}

function processItems() {
    let file = "";
    assets.forEach((a) => {
        let uniqueAsset = a.classid + "_" + a.instanceid;
        let item = itemsMap.get(uniqueAsset);
        file += createLine(item.tags, item.name)
    })
    fs.writeFileSync('items.csv', file);
}

function createLine(tags, name) {
    let itemName = name.split("| ")[1];
    if (tags.length === 6) {
        let stattrak = tags[3].localized_tag_name === "Normal" ? 0 : 1;
        let weapon = tags[1].localized_tag_name;
        let origin = tags[2].localized_tag_name;
        let condition = tags[5].localized_tag_name;
        let rarity = tags[4].localized_tag_name;
        return itemName + "," + condition + "," + stattrak + "," + weapon + "," + rarity + "," + origin + "\n";
    } else if (tags.length === 4) {
        let stattrak = tags[3].localized_tag_name === "Normal" ? 0 : 1;
        let weapon = tags[1].localized_tag_name;
        let origin = tags[2].localized_tag_name;
        return itemName + "," + "," + stattrak + "," + weapon + "," + origin + "\n";
    } else {
        return itemName + "\n";
    }
}

findMissingItems()
loadItems()
processItems()
