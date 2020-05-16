const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/Author");
const Book = require("./models/Book");
require("dotenv").config();

mongoose.set("useFindAndModify", false);
console.log("connecting to", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }
      try {
        return await Book.find({ ...filter });
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: root.name }).length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          const book = await new Book({ ...args, author }).save();
          return { ...book, author };
        } else {
          const newAuthor = await new Author({
            name: args.author,
            born: null,
          }).save();
          const book = await new Book({
            ...args,
            author: { ...newAuthor },
          }).save();
          return { ...book.toObject(), author: { ...newAuthor.toObject() } };
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name });
        author.born = args.setBornTo;
        return await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
