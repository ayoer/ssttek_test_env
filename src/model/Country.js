import mongoose from 'mongoose';
import ShortId from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const CountrySchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: ShortId.generate,
  },
  name: {
    type: String,
  },
  code2: {
    type: String,
  },
  code3: {
    type: String,
  },
  numericCode: {
    type: Number,
  },
  euMember: {type: Boolean, default: false},
  turkishName: {type: String},
});

const Country = mongoose.model('Country', CountrySchema);
export default Country;
