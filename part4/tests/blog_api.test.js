const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: "Testing 123",
    author: "Testy McTesterFace",
    url: "https://www.zombo.com/",
    likes: 700,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'Testing 123'
  )
})

test('the correct number of blog posts is returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier is named "id"', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined()
})

test('if no likes are included in request it will default to 0', async () => {
  const newBlog = {
    title: "Testing 123",
    author: "Testy McTesterFace",
    url: "https://www.zombo.com/",
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  console.log(addedBlog)
  expect(addedBlog.body.likes).toEqual(0)
})

afterAll(() => {
  mongoose.connection.close()
})