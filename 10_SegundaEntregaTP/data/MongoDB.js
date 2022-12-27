class File {
  constructor(schema) {
    this.schema = schema;
  }

  async Save(obj) {
    try {
      const document = schema(obj);
      document.save().then((data) => {
        return { message: 'Object saved successfully', data: data };
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  async GetByID(ID) {
    try {
      const data = await schema
        .findOne({ _id: mongoose.Types.ObjectId(ID) })
        .then((data) => {
          return { message: 'Get method executed successfully', data: data };
        });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  async GetAll() {
    try {
      const data = await schema.find().then((data) => {
        return { message: 'Get method executed successfully', data: data };
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  async DeleteByID(ID) {
    try {
      const data = await schema
        .deleteOne({ _id: mongoose.Types.ObjectId(ID) })
        .then(() => {
          return { message: `The object with the ID ${ID} has been deleted` };
        });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  async DeleteAll() {
    try {
      const data = await schema.deleteMany({}).then(() => {
        return { message: "All objects were deleted successfully" };
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  async EditByID(obj, ID) {
    try {
      User.findByIdAndUpdate(ID, { obj }, (err, docs) => {
        if (err) throw new Error(err);

        return { message: "Object edited successfully", data: docs };
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  // Nested methods

  async AddTo(ID, obj) {
    try {
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  async DeleteFrom(ID, ObjId) {
    try {
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
}
