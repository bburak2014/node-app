//database bağlantısı sayfaya çağırmak için bu  bağlantı kurulur.
const connection = require("../utility/database");
 

// burada ise Product isminde bir class olusturulur, işlemler bu class üzerinde yapılır.
//bu class Product adında dışarıya export edilir.yani diğer dosyaların ulaşabilmesi için
module.exports = class Sales_detail {
  constructor(
    sales_product_name,
    sales_product_group,
    sales_product_type,
    userid
     
  ) {
    this.sales_product_name = sales_product_name;
    this.sales_product_group = sales_product_group;
    this.sales_product_type = sales_product_type;
    this.userid = userid;
    
     
  }
   

  // ürün kayıt
  saveProduct() {
    return connection.execute(
      "INSERT INTO sales_detail (`sales_product_name`,`sales_product_group`,`sales_product_type`,`userid`) VALUES (?,?,?,?)",
      [
        this.sales_product_name,
        this.sales_product_group,
        this.sales_product_type,
        this.userid
      ]
      
    );
  }
 
  //veritabanından ürün getirme
  static getAll() {
    return connection.execute("SELECT *FROM  sales_detail");
  }
  // belirli bir kayıdı veritabanından getirir
  static getById(id) {
    return connection.execute("SELECT *FROM  sales_detail where products.id=?", [
      id,
    ]);
  }
  //veritabanına bir kayıdı Güncelleme
  static Update(product) {
    const x = connection.execute(
      "UPDATE products SET sales_detail.sales_product_name=?,sales_detail.sales_product_group=?, sales_detail.sales_product_type=?, sales_detail.userid=?  WHERE sales_detail.id=? ",
      [
        sales_detail.sales_product_name,
        sales_detail.sales_product_group,
        sales_detail.sales_product_type,
        sales_detail.userid,      
        sales_detail.id,
      ]
    );
    return x;
  }
  //veritabanından kayıt silme
  static DeleteById(id) {
    return connection.execute("DELETE from sales_detail WHERE id=?", [id]);
  }
  
};
