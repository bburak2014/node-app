//database bağlantısı sayfaya çağırmak için bu  bağlantı kurulur.
const connection = require("../utility/database");
 

// burada ise Product isminde bir class olusturulur, işlemler bu class üzerinde yapılır.
//bu class Product adında dışarıya export edilir.yani diğer dosyaların ulaşabilmesi için
module.exports = class Product {
  constructor(
    name,
    product_type,
    product_group,
    company,
    quantity,
    price,
    purpose,
    image,
    explain,
    categoryid,
    sequenceid
  ) {
    this.name = name;
    this.product_type = product_type;
    this.product_group = product_group;
    this.company = company;
    this.quantity = quantity;
    this.price = price;
    this.purpose = purpose;
    this.image = image;
    this.explain = explain;
    this.categoryid = categoryid;
    this.sequenceid=sequenceid;
  }
   

  // ürün kayıt
  saveProduct() {
    return connection.execute(
      "INSERT INTO products (`name`,`product_type`,`product_group`,`company`,`quantity`,`price` ,`purpose`,`image`,`explain`,`categoryid`,`sequenceid`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        this.name,
        this.product_type,
        this.product_group,
        this.company,
        this.quantity,
        this.price,
        this.purpose,
        this.image,
        this.explain,
        this.categoryid,
        this.sequenceid
      ]
      
    );
  }
 
  //veritabanından ürün getirme
  static getAll() {
    return connection.execute("SELECT *FROM  products");
  }
  // belirli bir kayıdı veritabanından getirir
  static getById(id) {
    return connection.execute("SELECT *FROM  products where products.id=?", [
      id,
    ]);
  }
  //veritabanına bir kayıdı Güncelleme
  static Update(product) {
    const x = connection.execute(
      "UPDATE products SET products.name=?,products.product_type=?, products.product_group=?, products.company=?, products.quantity=?, products.price=?, products.purpose=?, products.image=?, products.explain=?  WHERE products.id=? ",
      [
        product.name,
        product.product_type,
        product.product_group,
        product.company,
        product.quantity,
        product.price,
        product.purpose,
        product.image,
        product.explain,
        //product.categoryid,
        product.id,
      ]
    );
    return x;
  }
  //veritabanından kayıt silme
  static DeleteById(id) {
    return connection.execute("DELETE from products WHERE id=?", [id]);
  }
  //veri tabanından belli kategorileri getirir
  static getProductsByCategoryId(categoryid) {
    return connection.execute(
      "SELECT *FROM  products where products.categoryid=?",
      [categoryid]
    );
  }
};
