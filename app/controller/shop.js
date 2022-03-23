const Product = require("../models/product");
const Category = require("../models/category");
const Sales = require("../models/sales");
const Sales_detail = require("../models/sales_detail");
 
/*
bu modül category modelinden class ı categories
içine atıyoruz.daha sonra product verileri modelden alınıyor sonra da shop klasöründeki
index dosyası çalıştırılıyor.products tan gelen verinin 0.indexi products içine atılıyor diğerleride benzer mantıkla
çalışıyor.
*/
module.exports.getIndex = (req, res, next) => {
  const categories = Category.getAll();

  Product.getAll()
    .then((products) => {
      res.render("shop/index", {
        title: "Shopping",
        products: products[0],
        categories: categories,
        path: "/",
      });
 
    })

    .catch((err) => {
      console.log(err);
    });
};

module.exports.getJson = (req, res, next) => {
 
  Product.getAll()
 .then((products) => {
   res.json({
     products: products[0],
      

    });
 })

 .catch((err) => {
   console.log(err);
 }); 
};
module.exports.getJsonSalesDetails = (req, res, next) => {
  
  Sales_detail.getAll()
 .then((sales_detail) => {
   res.json({
    sales_detail: sales_detail[0],
      

    });
 })

 .catch((err) => {
   console.log(err);
 }); 
};
module.exports.getProducts = (req, res, next) => {
  const categories = Category.getAll();
  Product.getAll()
    .then((products) => {
      res.render("shop/products", {
        title: "Products",
        products: products[0],
        categories: categories,
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getProductsByCategoryId = (req, res, next) => {
  const categories = Category.getAll();
  Product.getProductsByCategoryId(req.params.categoryid)
    .then((products) => {
      res.render("shop/products", {
        title: "Products",
        products: products[0],
        categories: categories,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getProduct = (req, res, next) => {
  Product.getById(req.params.productid)
    .then((product) => {
      res.render("shop/product-detail", {
        title: product[0][0].name,
        product: product[0][0],
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(req.params.productid);
};

module.exports.getCart = (req, res, next) => {
  
  Product.getAll()
  .then((products) => {
    res.render("shop/card", {
      title: "Card",
      products: products[0],
       path: "/card"

    });

 
  })

  .catch((err) => {
    console.log(err);
  });
};
module.exports.postCart = (req, res, next) => {
  
   function my(){
    var Iyzipay = require("iyzipay");

    var iyzipay = new Iyzipay({
      apiKey: "sandbox-PryeyVYBl8aG5P3z3VMmnPyReWZYuqU8",
      secretKey: "sandbox-14SOpeAqt8BiZuXMaGNIvMx183lPFryG",
      uri: "https://sandbox-api.iyzipay.com",
    });
    
    var request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: "123456789",
      price: "1",
      paidPrice: "1.2",
      currency: Iyzipay.CURRENCY.TRY,
      installment: `${req.body.installment}`,
      basketId: "B67832",
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: `${req.body.Card_Holder}`,
        cardNumber: `${req.body.Card_Number}`,
        expireMonth: `${req.body.expireMonth}`,
        expireYear: `${req.body.expireYear}`,
        cvc: `${req.body.CVC_number}`,
        registerCard: "0",
      },
      buyer: {
        id: "BY789",
        name: `${req.body.First_name}`,
        surname: `${req.body.Last_name}`,
        gsmNumber: "+905350000000",
        email: "email@email.com",
        identityNumber: "74300864791",
        lastLoginDate: "2015-10-05 12:43:35",
        registrationDate: "2013-04-21 15:12:09",
        registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        ip: "85.34.78.112",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34732",
      },
      shippingAddress: {
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742",
      },
      billingAddress: {
        contactName: "Jane Doe",
        city: "Istanbul",
        country: "Turkey",
        address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
        zipCode: "34742",
      },
      basketItems: [
        {
          id: "BI101",
          name: "Binocular",
          category1: "Collectibles",
          category2: "Accessories",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: "0.3",
        },
        {
          id: "BI102",
          name: "Game code",
          category1: "Game",
          category2: "Online Game Items",
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: "0.5",
        },
        {
          id: "BI103",
          name: "Usb",
          category1: "Electronics",
          category2: "Usb / Cable",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: "0.2",
        },
      ],
    };
    
    
    iyzipay.payment.create(request, function (err, result) {
      console.log(err, result);

      
    
     })


     const sales = new Sales();
     sales.id = req.body.id;

     sales.First_name = req.body.First_name;
     sales.Last_name = req.body.Last_name;
     sales.E_mail = req.body.E_mail;
     sales.billingAddress = req.body.billingAddress;
     sales.shippingAddress = req.body.shippingAddress;
     sales.city = req.body.city;
     sales.country = req.body.country;
     sales.installment = req.body.installment;

     sales.saveProduct();


     const sales_detail = new Sales_detail();
     sales_detail.id = req.body.id;

     sales_detail.sales_product_name = req.body.sales_product_name;
     sales_detail.sales_product_group = req.body.sales_product_group;
     sales_detail.sales_product_type = req.body.sales_product_type;
     sales_detail.userid = req.body.userid;
     
     sales_detail.saveProduct();
      }
  let done = true;

  const isItDoneYet = new Promise((resolve, reject) => {

    if (done) {
      my();
      const workDone = 'Here is the thing I built'
      resolve(workDone)
    } else {
      const why = 'Still working on something else'
      reject(why)
    }
  })
  
  const checkIfItsDone = () => {
    isItDoneYet
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.error(err)
      })
  }
  
  checkIfItsDone();
 };

module.exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
  });
};
 
