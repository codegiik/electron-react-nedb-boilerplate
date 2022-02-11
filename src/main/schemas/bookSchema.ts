import { JSONSchemaType } from 'ajv';

export interface Book {
  name: string;
  description?: string;
  author: string;
  isbn?: string;
}

const bookSchema: JSONSchemaType<Book> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
      nullable: true,
    },
    author: {
      type: 'string',
    },
    isbn: {
      type: 'string',
      nullable: true,
    },
  },
  additionalProperties: false,
  required: ['name', 'author'],
};

export default bookSchema;
