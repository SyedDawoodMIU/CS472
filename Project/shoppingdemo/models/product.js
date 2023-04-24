let db = [];
let counter = 0;

module.exports = class Product {
  constructor(id, title, description, price, stock, image) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.image = image;
  }

  save() {
    this.id = ++counter; //start with 1;
    db.push(this);
    return this;
  }

  edit() {
    const index = db.findIndex((prod) => prod.id == this.id);
    db.splice(index, 1, this);
    return this;
  }

  static getAll() {
    return db;
  }

  static getByID(id) {
    return db.find((x) => x.id === id);
  }

  static deleteById(prodId) {
    const index = db.findIndex((prod) => prod.id == prodId);
    const deletedProd = db[index];
    db.splice(index, 1);
    return deletedProd;
  }
};
