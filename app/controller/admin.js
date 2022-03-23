//burda model içerisindeki bulunan catogary ve product modellerini bu js dosyasına import ediyoruz
const Category = require("../models/category");
const Product = require("../models/product");
const sharp=require('sharp');
 
 






//burda getproducts adında bir modul olusturuyoruz.bu modulde model içinde tanımladığımız getall fonksiyonunu kullanarak veri tabanındaki product tablosunu okuyoruz.
//res.render kullanarak daha önce wiev içinde hazırladığımız products.pug dosyasını çalıştırıyoruz.veri tababnındaki Products 0ncı indexi olan ilgili verilerimizi products ın
//içine atıyoruz.path içerisinde dosya yolunu olusturuyoruz.catch ile de hata kontrolü yapıyoruz.ayrıca title isminde pug dosyaların içine tanımladığımız

module.exports.getProducts = (req, res, next) => {
  Product.getAll()
    .then((products) => {
      res.render("admin/products", {
        title: "Admin Products",
        products: products[0],
        path: "/admin/products",
        action: req.query.action,
      });
   
    })
    .catch((err) => {
      console.log(err);
    });
};
//burda ki modülde category olarak tanımladığımız modelden gelen yapıyı getall fonksiyonu ile veritabanındaki
// category tablosunu buraya okuyoruz.ve adminproduct adlı pug dosyayı çalıştırıyoruz.
//title alanına ürün ekleme ifadesi ekleniyor.veritabanından gelen verinin 0 ıncı indexinde
//olan asıl veriler categories adlı class yapısına aktarılıyor.
module.exports.getAddProducts = (req, res, next) => {
  Category.getAll()
 .then((categories)=>{
  res.render("admin/add_product", {
    title: "Ürün Ekleme",
    categories: categories,
     path: "/admin/add_product",
  });
 })
 .catch(()=>{
   console.log(err);
 })


};
/*
bu modülde ise product isminde yeni bir class oluşturuluyor ve bu class Product yapısında oluşuyor.
 requestin body kısmında olan yani textboxlara uyazılan kısım yeni oluşan product un içerine atanıyor.
 modeldeki saveproduct fonksiyonu çalışıyor



*/
module.exports.postAddProducts = (req, res, next) => {
  const product=new Product();
  product.name=req.body.name;
  product.product_type=req.body.product_type;
  product.product_group=req.body.product_group;
  product.company=req.body.company;
  product.quantity=req.body.quantity;
  product.price=req.body.price;
  product.purpose=req.body.purpose;
 
  product.image= req.body.image;
  product.explain=req.body.explain;
  product.categoryid=req.body.categoryid;
  product.sequenceid=req.body.sequenceid;
 
   product.saveProduct()
  .then(()=>{
    res.redirect('/');
  })
  .catch((err)=>{
    console.log(err);
  });
   
    
   
}

/*
product classı getbyid fonk ile çalışır.bu fonk veri tabanından seçilen id yi göstermek için kullanılır.
req.params.idile seçilen id get by id fonk ile çalıştırılır.
*/
module.exports.getEditProducts = (req, res, next) => {
  Product.getById(req.params.productid)
    .then((product) => {
      Category.getAll()
      .then((categories)=>{
        res.render("admin/edit_product", {
          title: "Ürün Güncelleme",
          product: product[0][0],
          categories: categories[0],
          path: "/admin/products",
        });
      })
      .catch((err)=>{
        console.log(err);

      });
      
    })
    .catch((err) => {
      console.log(err);
    });
};
/*
bu modülde request body içine yani forma yazılan değerler  product ismindeki classa atanır.
daha sonra update metodu ile gene modelin içinde belirlediğimiz fonks.çalıştırılır ve veritabanında güncellenir
*/
module.exports.postEditProducts = (req, res, next) => {
  const product = new Product();
  product.id = req.body.id;

  product.name = req.body.name;
  product.product_type = req.body.product_type;
  product.product_group = req.body.product_group;
  product.company = req.body.company;
  product.quantity = req.body.quantity;
  product.price = req.body.price;
  product.purpose = req.body.purpose;
  product.image = req.body.image;
  product.explain = req.body.explain;
  product.categoryid = req.body.categoryid;

  Product.Update(product)
    .then(() => {
      res.redirect("/admin/products?action=edit");
    })
    .catch((err) => {
      console.log(err);
    });
};
/* 
burda ise içinde belirlediğim deletebyid fonk çalışır ve product içinde seçilen id li veri silinir
*/
module.exports.postDeleteProduct = (req, res, next) => {
  Product.DeleteById(req.body.productid)
  .then(()=>{
    res.redirect("/admin/products?action=delete");

  })
  .catch(()=>{
    console.log(err);
  });
};
module.exports.getReport = (req, res, next) => {
 
  Product.getAll()
    .then((products) => {
      res.render("admin/SalesReport", {
        title: "Sales Report",
        products: products[0],
         path: "/admin/SalesReport",
      });
 
    })

    .catch((err) => {
      console.log(err);
    });
};