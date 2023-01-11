import { normalize, schema } from "normalizr";

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

      const authorSchema = new schema.Entity(
        "author",
        {},
        { idAttribute: "id" }
      );

      const messageSchema = new schema.Entity("message", {
        author: authorSchema,
      });
      const postSchema = new schema.Entity("post", {
        mensajes: [messageSchema],
      });

      const dataNorm = normalize(data, postSchema);
      return dataNorm;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = MongoDB;
