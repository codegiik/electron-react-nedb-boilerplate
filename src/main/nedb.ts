import { join } from 'path';
import Datastore from 'nedb-promises';
import Ajv, { ValidateFunction } from 'ajv';
import bookSchema, { Book } from './schemas/bookSchema';

class Library {
  validator: ValidateFunction<Book>;

  db: Datastore;

  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.validator = ajv.compile(bookSchema);
    this.db = Datastore.create({
      filename: join(__dirname, 'db.db'),
      timestampData: true,
    });
  }

  validate(data: Book) {
    return this.validator(data);
  }

  async get(_id: number): Promise<Book> {
    return this.db.findOne({ _id });
  }

  async getAll(query: any): Promise<Book[]> {
    return this.db.find(query);
  }
}

export default new Library();