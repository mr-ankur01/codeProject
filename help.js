http://localhost:3000/api/addmultiprods

[
    {
      "title": "tshirt1",
      "slug": "tshirt1",
      "img": "tshirt.webp",
      "desc": "this is dese",
      "category": "tshirt",
      "size": "S",
      "color": "Red",
      "price": "499",
      "availableQty": 1
    },
    {
      "title": "tshirt1",
      "slug": "tshirt",
      "img": "tshrit1.jpg",
      "desc": "this is dese",
      "category": "tshirt",
      "size": "S",
      "color": "Red",
      "price": "499",
      "availableQty": 1
    },
    {
      "title": "tshirt1",
      "slug": "tshirt2",
      "img": "AllenSollyblack.jpg",
      "desc": "this is dese",
      "category": "tshirt",
      "size": "M",
      "color": "Red",
      "price": "499",
      "availableQty": 1
    },
    {
      "title": "tshirt1",
      "slug": "tshirt4",
      "img": "Vanyellow.jpg",
      "desc": "this is dese",
      "category": "tshirt",
      "size": "M",
      "color": "Black",
      "price": "499",
      "availableQty": 1
    },
    {
      "title": "tshirt1",
      "slug": "tshirt5",
      "img": "tshrit4.jpg",
      "desc": "this is dese",
      "category": "tshirt",
      "size": "S",
      "color": "Black",
      "price": "499",
      "availableQty": 1
    }
  ]

  http://localhost:3000/api/addorder
  {
    "name": "asdf",
    "email": "asdf@gmail.com",
    "address": "asdfsa",
    "phone": "asdf",
    "pincode": "sdfsadf",
    "city": "asf",
    "state": "sadf",
    "products": {"tshirt1":{"qty":1,"price":"499","name":"tshirt1","size":"S","variant":"Red","img":"tshirt.webp"}},
    "orderId": 1,
    "amount": 499
  }
  