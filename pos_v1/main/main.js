'use strict';
 function printReceipt(inputs) {

 buildCartItems(inputs);

 }
 function buildCartItems(inputs) {
 let allItems = loadAllItems();
 let count = [];
 let cartItems = [];

 for (let i = 0; i < inputs.length; i++) {
 var num = 1;
 for (let j = i + 1; j < inputs.length; j++) {
 if (inputs[i] === inputs[j]) {
 inputs.splice(j, 1);
 j--;
 num++;
 }
 }
 if (inputs[i].charAt(inputs[i].length - 2) != '-') {
 count.push({item: inputs[i].substr(0, 10), count: num});
 } else {
 count.push({item: inputs[i].substr(0, 10), count: parseInt(inputs[i].substr(11.12))+num-1});
 }
 }

 for(let num of count){
 for(let allItem of allItems){
 if(num.item === allItem.barcode){
 cartItems.push({item:allItem,count:num.count});
 }
 }
 }
 return cartItems;
 }

