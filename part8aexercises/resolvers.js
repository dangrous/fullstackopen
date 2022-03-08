const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()

const JWT_SECRET = process.env.SECRET_KEY

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let queries = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        queries.author = author.id
      }

      if (args.genre) {
        queries.genres = { $in: args.genre }
      }

      return Book.find(queries)
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const bookCount = await Book.find({ author: root.id })
      return bookCount.length
    },
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author)
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }

        let author = await Author.findOne({ name: args.author })
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          author = newAuthor
        }
        const book = new Book({ ...args, author: author._id })

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
