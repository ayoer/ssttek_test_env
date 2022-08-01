import mongoose from 'mongoose';
import Book from 'model/Book';

export const getBook = async (req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id).lean();

  res.send(book);
};

export const createBook = async (req, res) => {
  const {name, author, publishDate} = req.body;

  const book = await Book.create({name, author, publishDate});

  res.send(book);
};

export const updateBookPut = async (req, res) => {
  const {name, author, publishDate, id} = req.body;

  if (!id) throw 'id not found';
  if (!publishDate) throw 'publishDate not found';
  if (!author) throw 'author not found';
  if (!name) throw 'name not found';

  const book = await Book.findByIdAndUpdate(id, req.body, {new: true}).lean();

  res.send(book);
};
export const updateBookPatch = async (req, res) => {
  const {id} = req.body;

  if (!id) throw 'id not found';

  const book = await Book.findByIdAndUpdate(id, req.body, {new: true}).lean();

  res.send(book);
};

export const deleteBook = async (req, res) => {
  const {id} = req.query;
  if (!id) throw 'id not found';

  const book = await Book.findByIdAndDelete(id).lean();

  res.send(book);
};

export const searchBook = async (req, res) => {
  const book = await Book.find().lean();

  res.send(book);
};
