'use strict';

function printReceipt(tags) {
  const promotions = loadPromotions();
  const cartItems = buildCartItems(tags);
  const receiptItems = buildReceiptItems(cartItems, promotions);
  const receipt = buildReceipt(receiptItems);
  const receiprText = buildReceiptText(receipt);

  console.log(receiprText);
}

function buildCartItems(tags) {
  const cartItems = [];
  const allItems = loadAllItems();
  for (const tag of tags) {
    let splitItem = tag.split('-');
    let barcode = splitItem[0];
    let count = parseInt(splitItem[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);
    if (cartItem) {
      cartItem.count += count;
    } else {
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item, count});
    }
  }
  return cartItems;
}

function buildReceiptItems(cartItems, promotions) {
  return cartItems.map(cartItem => {
    let promotionType = getPromotionType(cartItem.item.barcode, promotions);
    let {subtotal, saved} = discount(cartItem.item.price, cartItem.count, promotionType);

    return {cartItem, subtota, saved};
  })
}


function getPromotionType(barcode, promotions) {
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));

  return promotion ? promotion.type : undefined;
}

function discount(price, count, promotionType) {
  let saved = 0;
  let subtotal = price * count;

  if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
    saved = price * parseInt(count / 3);
    subtotal -= saved;
  }
  return {saved, subtotal};
}

function buildReceipt(receiptItems) {
  let total = 0;
  let cheap = 0;
  for (const receiptItem of receiptItems) {
    total += receiptItem.subtotal;
    cheap += receiptItem.saved;
  }
  return {receiptItems, total, cheap};
}

function buildReceiptText(receipt) {
  let receiptText = receipt.receiptItems.map(receiptItem => {

    const cartItem = receiptItem.cartItem;
    return `名称：${cartItem.item.name}，
数量：${cartItem.count}${cartItem.item.unit}，
单价：${formatMoney(cartItem.item.price)}(元)，
小计：${formatMoney(receiptItem.subtotal)}(元)`
  }).join('\n');

  return `***<没钱赚商店>收据***
${receiptText}
----------------------
总计：${formatMoney(receipt.total)}(元)
节省：${formatMoney(receipt.cheap)}(元)
**********************`
}

function formatMoney(money) {
  return money.toFixed(2);
}
