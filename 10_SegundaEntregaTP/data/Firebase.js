const db = require('./firebaseConfig');

class Firebase {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  async Save(obj) {
    try {
      const newData = {
        id: Date.now(),
        ...obj,
      };
      const data = await this.collection
        .doc(newData.id.toString())
        .set(newData);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async GetByID(ID) {
    try {
      const data = await this.carritos.doc(ID.toString()).get();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async DeleteByID(ID) {
    try {
      const data = await this.collection.doc(ID.toString()).get();
      await this.collection.doc(ID.toString()).delete();
      return data.data();
    } catch (err) {
      throw new Error(err);
    }
  }

  async AddTo(ID, obj) {
    try {
      const cartToAdd = await this.collection.doc(ID.toString()).get();
      if (!cartToAdd.exists)
        throw new Error("The data desired to modify was not founded");

      const data = cartToAdd.data();
      const product = data.productos.find((prod) => prod.id === obj.id);
      if (product) {
        product.stock += product.stock;
      } else {
        data.products.push(obj);
      }
      await this.collection.doc(ID.toString()).update(data);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async DeleteFrom(ID, ObjId) {
    try {
      const dataToDelete = await this.collection.doc(ID.toString()).get();

      if (!dataToDelete.exists)
        throw new Error("The data desired to delete was not founded");

      const data = dataToDelete.data();
      const product = data.products.find((prod) => prod.id === ObjId);

      if (!product)
        throw new Error("The data desired to delete was not founded");

      data.products = data.products.filter((prod) => prod.id !== ObjId);
      await this.carritos.doc(ID.toString()).update(data);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Firebase