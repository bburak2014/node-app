const connection=require('../utility/database');


module.exports=class Category{
    constructor(name,description){
        this.id=(categories.length+1).toString();
        this.name=name;
        this.description=description;

    }
    saveCategory(){
        return connection.execute("INSERT INTO  categories (`name`,`explain`) VALUES (?,?)",
        [this.name ,this.explain]);
      }
    static getAll(){
        return connection.execute('SELECT *FROM  categories');
    }
    static getById(id){
        return connection.execute('SELECT *FROM  categories WHERE id=?',[id]);
    }
    static update(category){
        return connection.execute("UPDATE categories SET categories.name=?,categories.explain=?  WHERE categories.id=? ",

        [category.name ,category.explain,category.id]);
    
    }
    static deleteById(id){
        return connection.execute("DELETE from categories WHERE id=?",[id]);


    }
   
}