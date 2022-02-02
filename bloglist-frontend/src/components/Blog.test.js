import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This is a blog title',
    author: 'Testing Author',
    url: 'http://www.example.com',
    likes: 69420,
  }

  const component = render(
    <Blog
      blog={blog}
      username='tester'
      updateBlog={() => 0}
      removeBlog={() => 0}
    />
  )

  expect(component.container).toHaveTextContent('This is a blog title')
  expect(component.container).toHaveTextContent('Testing Author')
  expect(component.container).not.toHaveTextContent('http://www.example.com')
  expect(component.container).not.toHaveTextContent('69420')

  component.debug()
})