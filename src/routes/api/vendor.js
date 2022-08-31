import express from 'express';

import {getVendor, searchVendor, createVendor, updateVendor, deleteVendor} from 'controller/vendor';

const router = express.Router();

router.route('/search').post(searchVendor);
router.route('/:id').get(getVendor).delete(deleteVendor);
router.route('/').post(createVendor).put(updateVendor);

export default router;
