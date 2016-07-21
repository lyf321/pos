'use strict';

describe('pos', () => {
  let inputs;
  let cartItems;
  let subtotalItems;
  let receipt;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
    cartItems = [
      {
        item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
        count: 5
      },
      {
        item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
        count: 2
      },
      {
        item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50},
        count: 3
      }];

    subtotalItems = [
      {
        cartItem: {
          item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
          count: 5
        },
        subtotal: 12,
        saved: 3
      },
      {
        cartItem: {
          item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
          count: 2
        },
        subtotal: 30,
        saved: 0
      },
      {
        cartItem: {
          item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50},
          count: 3
        },
        subtotal: 9,
        saved: 4.5
      }];

    receipt = {
      receiptItems: [{
        cartItem: {
          item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
          count: 5
        },
        subtotal: 12,
        saved: 3
      },
        {
          cartItem: {
            item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
            count: 2
          },
          subtotal: 30,
          saved: 0
        },
        {
          cartItem: {
            item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50},
            count: 3
          },
          subtotal: 9,
          saved: 4.5
        }],
      total: 51,
      cheap: 7.5
    };

  });

  it('should print correct', () => {

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });


  it("buildCartItems", () => {
    let cartItems = buildCartItems(inputs);

    const expectext = [
      {
        item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
        count: 5
      },
      {
        item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
        count: 2
      },
      {
        item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50},
        count: 3
      }
    ];

    expect(cartItems).toEqual(expectext);
  });

  it('buildReceiptItems', () => {
    let promotions = loadPromotions();
    let subtotalItems = buildReceiptItems(cartItems, promotions);

    const expectArray = [
      {
        cartItem: {
          item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
          count: 5
        },
        subtotal: 12,
        saved: 3
      },
      {
        cartItem: {
          item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
          count: 2
        },
        subtotal: 30,
        saved: 0
      },
      {
        cartItem: {
          item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50},
          count: 3
        },
        subtotal: 9,
        saved: 4.5
      }];

    expect(subtotalItems).toEqual(expectArray);
  });

  it('buildReceipt', () => {
    let receipt = buildReceipt(subtotalItems);

    const expectArray = {
      receiptItems: [{
        cartItem: {
          item: {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
          count: 5
        },
        subtotal: 12,
        saved: 3
      },
        {
          cartItem: {
            item: {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
            count: 2
          },
          subtotal: 30,
          saved: 0
        },
        {
          cartItem: {
            item: {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50},
            count: 3
          },
          subtotal: 9,
          saved: 4.5
        }],
      total: 51,
      cheap: 7.5
    };

    expect(receipt).toEqual(expectArray);
  });

  it('buildReceiptText',() => {
    let string = buildReceiptText(receipt);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(string).toEqual(expectText);

  });

});
