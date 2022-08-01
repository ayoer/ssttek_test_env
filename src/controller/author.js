import Author from 'model/Author';

export const createAuthor = async (req, res) => {
  const {name} = req.body;

  const author = await Author.create({name});

  res.send(author);
};
