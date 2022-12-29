class MongoDB {
  constructor(schema) {
    this.schema = schema;
  }

  async Save(obj) {
    try {
      const document = schema(obj);
      document.save().then((data) => {
        return data;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async GetByID(ID) {
    try {
      const data = await schema
        .findOne({ _id: mongoose.Types.ObjectId(ID) })
        .then((data) => {
          return data;
        });
    } catch (err) {
      throw new Error(err);
    }
  }

  async GetAll() {
    try {
      const data = await schema.find().then((data) => {
        return data;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async DeleteByID(ID) {
    try {
      const data = await schema
        .deleteOne({ _id: mongoose.Types.ObjectId(ID) })
        .then(() => {
          return data;
        });
    } catch (err) {
      throw new Error(err);
    }
  }

  async DeleteAll() {
    try {
      const data = await schema.deleteMany({}).then(() => {
        return { message: "All objects were deleted successfully" };
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async EditByID(obj, ID) {
    try {
      User.findByIdAndUpdate(ID, { obj }, (err, docs) => {
        if (err) throw new Error(err);
        return docs;
      });
    } catch (err) {
      throw new Error(err);
    }
  }

}

module.exports = MongoDB