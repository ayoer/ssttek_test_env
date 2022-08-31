import mongoose from 'mongoose';
import shortid from 'shortid';

const {ObjectId} = mongoose.Schema.Types;

const VendorSchema = new mongoose.Schema({
  shortId: {
    type: String,
    default: shortid.generate,
  },
  name: {
    type: String,
  },
  displayName: {
    type: String,
  },
  countryId: {
    type: ObjectId,
    ref: 'Country',
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Vendor = mongoose.model('Vendor', VendorSchema);

export default Vendor;
