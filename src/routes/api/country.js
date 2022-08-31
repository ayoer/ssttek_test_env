import express from 'express';
import {initCountry, getCountry, searchCountry} from 'controller/country';

const router = express.Router();

router.route('/search').post(searchCountry);
router.route('/:id').get(getCountry);
router.route('/').post(initCountry);

export default router;
