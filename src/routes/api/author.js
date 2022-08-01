import express from 'express';

import {createAuthor} from 'controller/author';

const router = express.Router();

// router.route('/search').post(searchBook);
// router.route('/id').get(getBook);
router.route('/').post(createAuthor);

export default router;
