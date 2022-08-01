import mongoose from 'mongoose';
import shortid from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const AuthorSchema = new mongoose.Schema({
  shortId: {
    type: String,
    default: shortid.generate,
  },
  name: {
    type: String,
  },
});

const Author = mongoose.model('Author', AuthorSchema);

export default Author;
