import mongoose from 'mongoose';
import shortid from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const BookSchema = new mongoose.Schema({
  shortId: {
    type: String,
    default: shortid.generate,
  },
  name: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
  },
});

const Book = mongoose.model('BookSsttek', BookSchema);

export default Book;
