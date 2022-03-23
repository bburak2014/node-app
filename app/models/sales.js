//database bağlantısı sayfaya çağırmak için bu  bağlantı kurulur.
const connection = require("../utility/database");
 

// burada ise Product isminde bir class olusturulur, işlemler bu class üzerinde yapılır.
//bu class Product adında dışarıya export edilir.yani diğer dosyaların ulaşabilmesi için
module.exports = class Sales {
  constructor(
    First_name,
    Last_name,
    E_mail,
    billingAddress,
    shippingAddress,
    city,
    country,
    installment
     
  ) {
    this.First_name = First_name;
    this.Last_name = Last_name;
    this.E_mail = E_mail;
    this.billingAddress = billingAddress;
    this.shippingAddress = shippingAddress;
    this.city = city;
    this.country = country;
    this.installment = installment;
     
  }
   

  // ürün kayıt
  saveProduct() {
    return connection.execute(
      "INSERT INTO sales (`First_name`,`Last_name`,`E_mail`,`billingAddress`,`shippingAddress`,`city` ,`country`,`installment`) VALUES (?,?,?,?,?,?,?,?)",
      [
        this.First_name,
        this.Last_name,
        this.E_mail,
        this.billingAddress,
        this.shippingAddress,
        this.city,
        this.country,
        this.installment
      ]
      
    );
  }
 
  //veritabanından ürün getirme
  static getAll() {
    return connection.execute("SELECT *FROM  sales");
  }
  // belirli bir kayıdı veritabanından getirir
  static getById(id) {
    return connection.execute("SELECT *FROM  sales where products.id=?", [
      id,
    ]);
  }
  //veritabanına bir kayıdı Güncelleme
  static Update(product) {
    const x = connection.execute(
      "UPDATE products SET sales.First_name=?,sales.Last_name=?, sales.E_mail=?, sales.billingAddress=?, sales.shippingAddress=?, sales.city=?, sales.country=?, sales.installment=?  WHERE sales.id=? ",
      [
        sales.First_name,
        sales.Last_name,
        sales.E_mail,
        sales.billingAddress,
        sales.shippingAddress,
        sales.city,
        sales.country,
        sales.installment,
        
        sales.id,
      ]
    );
    return x;
  }
  //veritabanından kayıt silme
  static DeleteById(id) {
    return connection.execute("DELETE from sales WHERE id=?", [id]);
  }
  
};
