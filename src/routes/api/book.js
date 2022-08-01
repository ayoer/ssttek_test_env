import express from 'express';

import {searchBook, createBook, getBook, updateBookPut, updateBookPatch, deleteBook} from 'controller/book';

const router = express.Router();

router.route('/search').post(searchBook);
router.route('/id').get(getBook).put(updateBookPut);
router.route('/').post(createBook).patch(updateBookPatch).delete(deleteBook);

export default router;
