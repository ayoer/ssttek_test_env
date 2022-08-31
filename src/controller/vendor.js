import mongoose from 'mongoose';
import ErrorResponse from 'helpers/errorResponse';
import errors from 'helpers/errors';
import {search} from 'helpers/filterParser';
import Vendor from 'model/Vendor';

const searchTextFields = ['name', 'displayName', 'country', 'address', 'phone'];
const adminFields = [];
const defaultProjection = ['name', 'displayName', 'countryId', 'country', 'address', 'phone'];
const lookupInfo = [
  {
    from: 'countries',
    localField: 'countryId',
    foreignField: '_id',
    as: 'country',
    isSingle: true,
  },
];

export const getVendor = async (req, res) => {
  const {id} = req.params;

  if (!id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'id not found');

  const vendor = await getFullVendor(id);

  res.send(vendor);
};

export const createVendor = async (req, res) => {
  const {name, displayName, countryId, address, phone} = req.body;

  if (!name) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'name not found');
  if (!displayName) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'displayName not found');
  if (!countryId) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'countryId not found');
  if (!address) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'address not found');
  if (!phone) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'phone not found');

  const vendor = await Vendor.create(req.body);

  res.send(await getFullVendor(vendor._id));
};

export const updateVendor = async (req, res) => {
  const {id} = req.body;

  if (!id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'id not found');

  const vendor = await Vendor.findByIdAndUpdate(id, req.body, {new: true});

  res.send(await getFullVendor(vendor._id));
};
export const deleteVendor = async (req, res) => {
  const {id} = req.params;
  if (!id) throw new ErrorResponse(errors.INVALID_OR_MISSING_PROPERTY, 'id not found');

  const vendor = await Vendor.findById(id);

  if (!vendor) throw new ErrorResponse(errors.RECORD_NOT_FOUND, 'Vendor not found');

  await Vendor.findByIdAndDelete(id);

  res.send('OK');
};
export const searchVendor = async (req, res) => {
  const filter = req.body.filter || {
    filter: {
      page: {
        size: 500,
        number: 0,
      },
    },
  };

  res.send(await search(null, Vendor, searchTextFields, filter, defaultProjection, adminFields, lookupInfo));
};

const getFullVendor = async (_id) => {
  const vendors = await Vendor.aggregate([
    {$match: {_id: {$eq: mongoose.Types.ObjectId(_id)}}},
    {
      $lookup: {
        from: 'countries',
        localField: 'countryId',
        foreignField: '_id',
        as: 'country',
      },
    },
    {
      $unwind: {
        path: '$country',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]).exec();

  if (!vendors[0]) throw new ErrorResponse(errors.RECORD_NOT_FOUND);

  return vendors[0];
};
